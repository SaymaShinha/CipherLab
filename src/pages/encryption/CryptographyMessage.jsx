import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDownToLine,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  FileKey2,
  Fingerprint,
  Info,
  KeyRound,
  Lock,
  RefreshCw,
  Shield,
  ShieldCheck,
  Sparkles,
  Unlock,
  X,
} from "lucide-react";

import SEO from "../../components/SEO.jsx";
import ToolLayout from "../../components/ToolLayout.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import { faqData } from "../../data/faq.js";

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const VERSION = 2;
const DICTIONARY_SIZE = 256;

const ITERATIONS = 310000;
const KEY_LENGTH = 256;

const SALT_LENGTH = 16;
const IV_LENGTH = 12;

const TAG_LENGTH = 128;

const PACKAGE_HEADER_LENGTH = 1 + 32 + SALT_LENGTH + IV_LENGTH;

/* -------------------------------------------------------------------------- */
/* Word extraction                                                            */
/* -------------------------------------------------------------------------- */

function normalizeWord(word) {
  return word
    .toLowerCase()
    .replace(/^[^a-z]+|[^a-z]+$/g, "")
    .trim();
}

function extractWords(text) {
  if (!text || !text.trim()) return [];

  const rawWords = text.match(/[A-Za-z]+(?:['-][A-Za-z]+)*/g) || [];

  const result = [];
  const seen = new Set();

  for (const rawWord of rawWords) {
    const word = normalizeWord(rawWord);

    if (!word) continue;

    if (!seen.has(word)) {
      seen.add(word);
      result.push(word);
    }
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/* Dictionary                                                                 */
/* -------------------------------------------------------------------------- */

function selectDictionary(sourceText) {
  const words = extractWords(sourceText);

  if (words.length < DICTIONARY_SIZE) {
    throw new Error(
      `Your paragraph contains only ${words.length} unique usable words. Please provide at least 256 unique English words.`,
    );
  }

  const beginningCount = 85;
  const middleCount = 86;
  const endingCount = 85;

  const selected = [];
  const selectedSet = new Set();

  function addWord(word) {
    if (!selectedSet.has(word) && selected.length < DICTIONARY_SIZE) {
      selectedSet.add(word);
      selected.push(word);
    }
  }

  for (let i = 0; i < beginningCount && i < words.length; i += 1) {
    addWord(words[i]);
  }

  const middleStart = Math.max(
    0,
    Math.floor(words.length / 2) - Math.floor(middleCount / 2),
  );

  for (
    let i = middleStart;
    i < words.length && selected.length < beginningCount + middleCount;
    i += 1
  ) {
    addWord(words[i]);
  }

  const endingStart = Math.max(0, words.length - endingCount);

  for (
    let i = endingStart;
    i < words.length && selected.length < DICTIONARY_SIZE;
    i += 1
  ) {
    addWord(words[i]);
  }

  if (selected.length < DICTIONARY_SIZE) {
    for (const word of words) {
      addWord(word);

      if (selected.length === DICTIONARY_SIZE) {
        break;
      }
    }
  }

  if (selected.length !== DICTIONARY_SIZE) {
    throw new Error(
      `Unable to construct a ${DICTIONARY_SIZE}-word dictionary from the supplied paragraph.`,
    );
  }

  return selected;
}

/* -------------------------------------------------------------------------- */
/* Byte helpers                                                               */
/* -------------------------------------------------------------------------- */

function concatBytes(...arrays) {
  const totalLength = arrays.reduce((sum, array) => sum + array.length, 0);

  const result = new Uint8Array(totalLength);

  let offset = 0;

  for (const array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }

  return result;
}

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/* -------------------------------------------------------------------------- */
/* Dictionary encoding                                                        */
/* -------------------------------------------------------------------------- */

function bytesToWords(bytes, dictionary) {
  return Array.from(bytes, (byte) => dictionary[byte]).join(" ");
}

function wordsToBytes(text, dictionary) {
  const wordToByte = new Map(
    dictionary.map((word, index) => [word.toLowerCase(), index]),
  );

  const words = text.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (!words.length) {
    throw new Error("Enter encrypted words first.");
  }

  const bytes = new Uint8Array(words.length);

  for (let i = 0; i < words.length; i += 1) {
    const value = wordToByte.get(words[i]);

    if (value === undefined) {
      throw new Error(
        `Unknown encrypted word: "${words[i]}". Make sure the same source paragraph is being used.`,
      );
    }

    bytes[i] = value;
  }

  return bytes;
}

/* -------------------------------------------------------------------------- */
/* Dictionary fingerprint                                                     */
/* -------------------------------------------------------------------------- */

async function dictionaryFingerprint(dictionary) {
  const encoder = new TextEncoder();

  const canonical = dictionary.map((word) => word.toLowerCase()).join("|");

  const data = encoder.encode(canonical);

  return new Uint8Array(await crypto.subtle.digest("SHA-256", data));
}

/* -------------------------------------------------------------------------- */
/* PBKDF2                                                                      */
/* -------------------------------------------------------------------------- */

async function deriveKey(password, salt) {
  const encoder = new TextEncoder();

  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    passwordKey,
    {
      name: "AES-GCM",
      length: KEY_LENGTH,
    },
    false,
    ["encrypt", "decrypt"],
  );
}

/* -------------------------------------------------------------------------- */
/* AES-256-GCM                                                                */
/* -------------------------------------------------------------------------- */

async function encryptMessage(message, password, dictionary) {
  const encoder = new TextEncoder();

  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));

  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const dictionaryHash = await dictionaryFingerprint(dictionary);

  const key = await deriveKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      tagLength: TAG_LENGTH,
    },
    key,
    encoder.encode(message),
  );

  const packageBytes = concatBytes(
    new Uint8Array([VERSION]),
    dictionaryHash,
    salt,
    iv,
    new Uint8Array(encrypted),
  );

  return {
    words: bytesToWords(packageBytes, dictionary),
    packageBytes,
  };
}

async function decryptMessage(encryptedWords, password, dictionary) {
  const bytes = wordsToBytes(encryptedWords, dictionary);

  const minimumLength = PACKAGE_HEADER_LENGTH + TAG_LENGTH / 8 + 1;

  if (bytes.length < minimumLength) {
    throw new Error("The encrypted message is incomplete or invalid.");
  }

  const version = bytes[0];

  if (version !== VERSION) {
    throw new Error(`Unsupported encrypted message version: ${version}.`);
  }

  const storedDictionaryHash = bytes.slice(1, 33);

  const currentDictionaryHash = await dictionaryFingerprint(dictionary);

  if (bytesToHex(storedDictionaryHash) !== bytesToHex(currentDictionaryHash)) {
    throw new Error(
      "The source paragraph does not produce the same 256-word dictionary used for this encrypted message.",
    );
  }

  const saltStart = 33;
  const saltEnd = saltStart + SALT_LENGTH;

  const ivStart = saltEnd;
  const ivEnd = ivStart + IV_LENGTH;

  const salt = bytes.slice(saltStart, saltEnd);

  const iv = bytes.slice(ivStart, ivEnd);

  const ciphertext = bytes.slice(ivEnd);

  const key = await deriveKey(password, salt);

  try {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
        tagLength: TAG_LENGTH,
      },
      key,
      ciphertext,
    );

    return new TextDecoder().decode(decrypted);
  } catch {
    throw new Error(
      "Decryption failed. The password may be incorrect, the encrypted message may have been changed, or the wrong source paragraph may have been supplied.",
    );
  }
}

/* -------------------------------------------------------------------------- */
/* SHA-256                                                                     */
/* -------------------------------------------------------------------------- */

async function sha256(text) {
  const data = new TextEncoder().encode(text);

  const hash = await crypto.subtle.digest("SHA-256", data);

  return bytesToHex(new Uint8Array(hash));
}

/* -------------------------------------------------------------------------- */
/* Password strength                                                           */
/* -------------------------------------------------------------------------- */

function getPasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      label: "No password",
    };
  }

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return {
      score,
      label: "Weak",
    };
  }

  if (score <= 4) {
    return {
      score,
      label: "Moderate",
    };
  }

  return {
    score,
    label: "Strong",
  };
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function CryptographyPage() {
  const [mode, setMode] = useState("encrypt");

  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");

  const [sourceParagraph, setSourceParagraph] = useState("");

  const [dictionary, setDictionary] = useState([]);

  const [dictionaryGenerated, setDictionaryGenerated] = useState(false);

  const [result, setResult] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const [error, setError] = useState("");

  const [showAdvanced, setShowAdvanced] = useState(false);

  const [showDictionary, setShowDictionary] = useState(false);

  const [fingerprint, setFingerprint] = useState("");

  const [dictionarySourceStats, setDictionarySourceStats] = useState({
    total: 0,
    beginning: 0,
    middle: 0,
    ending: 0,
  });

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password],
  );

  const sourceWordCount = useMemo(
    () => extractWords(sourceParagraph).length,
    [sourceParagraph],
  );

  const resultWordCount = useMemo(() => {
    if (!result.trim()) return 0;

    return result.trim().split(/\s+/).filter(Boolean).length;
  }, [result]);

  const generateDictionary = () => {
    setError("");
    setResult("");
    setFingerprint("");
    setCopied(false);

    try {
      const words = extractWords(sourceParagraph);

      if (words.length < DICTIONARY_SIZE) {
        throw new Error(
          `Your paragraph contains only ${words.length} unique usable words. Please provide at least 256 unique words.`,
        );
      }

      const selected = selectDictionary(sourceParagraph);

      setDictionary(selected);
      setDictionaryGenerated(true);

      setDictionarySourceStats({
        total: words.length,
        beginning: 85,
        middle: 86,
        ending: 85,
      });
    } catch (err) {
      setDictionary([]);
      setDictionaryGenerated(false);

      setError(
        err instanceof Error ? err.message : "Unable to create the dictionary.",
      );
    }
  };

  const handleProcess = async () => {
    setError("");
    setCopied(false);
    setFingerprint("");

    const input = message.trim();

    if (!input) {
      setError(
        mode === "encrypt"
          ? "Enter a message to encrypt."
          : "Paste an encrypted word sequence to decrypt.",
      );
      return;
    }

    if (!password) {
      setError("Enter your password before continuing.");
      return;
    }

    if (mode === "encrypt" && password.length < 8) {
      setError("For encryption, use a password with at least 8 characters.");
      return;
    }

    if (!dictionaryGenerated || dictionary.length !== 256) {
      setError(
        "Generate the 256-word dictionary before processing the message.",
      );
      return;
    }

    setLoading(true);

    try {
      if (mode === "encrypt") {
        const encrypted = await encryptMessage(input, password, dictionary);

        setResult(encrypted.words);

        setFingerprint(await sha256(encrypted.words));
      } else {
        const decrypted = await decryptMessage(input, password, dictionary);

        setResult(decrypted);

        setFingerprint(await sha256(decrypted));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while processing the message.",
      );

      setResult("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Unable to copy the result.");
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const filename =
      mode === "encrypt" ? "encrypted-message.txt" : "decrypted-message.txt";

    const blob = new Blob([result], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setResult("");
    setError("");
    setFingerprint("");
    setCopied(false);
  };

  const loadExample = async () => {
    const examplePassword = "SilverRiver!2026";

    const exampleMessage =
      "This is a private message protected with AES-256-GCM.";

    const exampleParagraph = `
      Across the quiet river valley, silver morning light touched the ancient
      garden while distant birds moved between cedar trees and peaceful hills.
      Every traveler carried a story, a memory, a lesson, a question, and a
      hope for another day. Knowledge grows through patience, careful work,
      honest conversation, thoughtful reading, curiosity, kindness, courage,
      wisdom, friendship, learning, practice, reflection, discovery, purpose,
      balance, clarity, trust, respect, creativity, service, nature, history,
      language, culture, science, mathematics, design, technology, security,
      privacy, responsibility, community, family, education, progress, change,
      growth, opportunity, experience, imagination, discipline, attention,
      focus, effort, success, failure, improvement, understanding, insight,
      evidence, reason, observation, research, information, communication,
      cooperation, preparation, planning, action, result, value, meaning,
      beauty, simplicity, freedom, peace, justice, gratitude, generosity,
      compassion, humility, confidence, strength, character, habit, intention,
      direction, journey, destination, beginning, middle, ending, season,
      winter, spring, summer, autumn, morning, evening, sunrise, sunset,
      cloud, rain, wind, forest, meadow, mountain, stone, flower, leaf, branch,
      root, seed, field, road, bridge, house, window, door, room, table,
      chair, book, paper, pen, letter, message, word, sentence, paragraph,
      chapter, page, picture, sound, music, rhythm, color, shape, pattern,
      number, symbol, code, system, network, computer, browser, software,
      application, document, file, folder, screen, button, input, output,
      process, function, method, value, object, array, memory, storage,
      device, signal, key, lock, shield, protection, secure, secret, password,
      encryption, cipher, sender, receiver, connection, digital, local,
      private, public, safe, reliable, useful, practical, modern, simple,
      clear, natural, readable, meaningful, complete, accurate, strong,
      careful, trusted, protected, prepared, consistent, sustainable,
      valuable, helpful, friendly, professional, elegant, compact, responsive,
      accessible, relevant, original, quality, knowledge, understanding,
      wisdom, reflection, purpose, progress, future, possibility, chance,
      choice, decision, action, success, gratitude, kindness, peace, hope,
      courage, patience, horizon, light, river, meadow, lantern, willow,
      cedar, silver, garden, stone, morning, valley, forest, mountain, bridge,
      window, book, language, privacy, security, password, encryption,
      message, protection, learning, discovery, purpose.
    `;

    setSourceParagraph(exampleParagraph);

    setPassword(examplePassword);
    setError("");
    setFingerprint("");
    setCopied(false);

    try {
      const selected = selectDictionary(exampleParagraph);

      setDictionary(selected);
      setDictionaryGenerated(true);

      const sourceWords = extractWords(exampleParagraph);

      setDictionarySourceStats({
        total: sourceWords.length,
        beginning: 85,
        middle: 86,
        ending: 85,
      });

      if (mode === "encrypt") {
        setMessage(exampleMessage);
        setLoading(true);

        const encrypted = await encryptMessage(
          exampleMessage,
          examplePassword,
          selected,
        );

        setResult(encrypted.words);

        setFingerprint(await sha256(encrypted.words));
      } else {
        setLoading(true);

        const encrypted = await encryptMessage(
          exampleMessage,
          examplePassword,
          selected,
        );

        setMessage(encrypted.words);
        setResult(exampleMessage);

        setFingerprint(await sha256(exampleMessage));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load the example.",
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setMessage("");
    setPassword("");
    setSourceParagraph("");
    setDictionary([]);
    setDictionaryGenerated(false);
    setResult("");
    setError("");
    setFingerprint("");
    setCopied(false);

    setDictionarySourceStats({
      total: 0,
      beginning: 0,
      middle: 0,
      ending: 0,
    });
  };

  const useResultAsInput = () => {
    if (!result) return;

    setMessage(result);

    setMode(mode === "encrypt" ? "decrypt" : "encrypt");

    setResult("");
    setFingerprint("");
    setCopied(false);
    setError("");
  };

  return (
    <>
      <SEO
        title="Cryptography Message Tool - AES-256-GCM Encryption Online"
        description="Encrypt and decrypt messages locally using AES-256-GCM with PBKDF2-SHA-256. Represent encrypted data as ordinary English dictionary words selected automatically from your own paragraph."
        canonical="/tools/cryptography"
      />

      <ToolLayout
        title="Cryptography Message Tool"
        description="Encrypt and decrypt private messages locally in your browser using authenticated AES-256-GCM encryption."
        intro={
          <>
            <p>
              Protect text with AES-256-GCM and represent the resulting
              encrypted bytes as ordinary English words. You provide a
              paragraph, and CipherLab automatically creates a 256-word encoding
              dictionary.
            </p>

            <p className="mt-4">
              The words are only an encoding layer. They do not replace AES
              encryption or act as the password.
            </p>
          </>
        }
        howToUse={[
          "Provide a paragraph containing at least 256 unique English words.",
          "Generate the 256-word dictionary.",
          "Choose Encrypt or Decrypt.",
          "Enter your message and password.",
          "Process, copy, or download the result.",
        ]}
        features={[
          {
            title: "AES-256-GCM",
            description: "Authenticated encryption using a 256-bit AES key.",
          },
          {
            title: "PBKDF2-SHA-256",
            description: "Derives the AES key from your password.",
          },
          {
            title: "256-word encoding",
            description:
              "Represents encrypted bytes using your selected word dictionary.",
          },
          {
            title: "Browser processing",
            description:
              "The cryptographic operation runs locally using Web Crypto.",
          },
        ]}
        example={
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <ExampleBox
              label="Original message"
              value="This is a private message protected with AES-256-GCM."
            />

            <ExampleBox
              label="Word representation"
              value="cedar river orbit lantern meadow silver garden willow ..."
            />
          </div>
        }
        aboutTitle="What Is Message Encryption?"
        aboutContent={
          <>
            <p>
              Encryption transforms readable information into ciphertext so the
              original content cannot be directly understood without the
              required secret.
            </p>

            <p>
              CipherLab uses AES-256-GCM authenticated encryption. GCM provides
              both confidentiality and integrity protection.
            </p>

            <p>
              The password is processed with PBKDF2-SHA-256 to derive a 256-bit
              AES key. Each encryption operation generates a fresh random salt
              and IV.
            </p>

            <p>
              The English words are only an encoding representation of the
              encrypted bytes. They do not make the cryptography stronger.
            </p>
          </>
        }
        useCases={[
          {
            title: "Private notes",
            description: "Protect text before storing or transferring it.",
          },
          {
            title: "Developer testing",
            description:
              "Experiment with authenticated encryption and encoding.",
          },
          {
            title: "Cryptography learning",
            description:
              "Explore passwords, salts, IVs, tags, keys, and ciphertext.",
          },
          {
            title: "Text transfer",
            description:
              "Represent encrypted data as a sequence of ordinary words.",
          },
        ]}
        faqItems={faqData["cryptography"]}
        relatedTools={[
          {
            name: "AES-256-GCM",
            path: "/tools/encryption/aes-256-gcm",
            description: "Explore AES-256-GCM encryption.",
          },
          {
            name: "SHA-256",
            path: "/tools/hashing/sha-256",
            description: "Generate SHA-256 hashes.",
          },
          {
            name: "Password Generator",
            path: "/tools/security/password-generator",
            description: "Generate secure random passwords.",
          },
        ]}
      >
        <div className="space-y-6">
          {/* ================================================================
              TOOL HEADER
          ================================================================= */}

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-cyan-500/[0.06] p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-300">
                    <ShieldCheck size={13} />
                    Authenticated Encryption
                  </div>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Encrypt messages into word-based ciphertext
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    AES-256-GCM protects the message while your custom 256-word
                    dictionary changes how the encrypted bytes are represented.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <StatBadge value="256-bit" label="AES key" />
                  <StatBadge value="GCM" label="Mode" />
                  <StatBadge value="PBKDF2" label="KDF" />
                  <StatBadge value="Local" label="Processing" />
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              STEP 1 — DICTIONARY
          ================================================================= */}

          <ToolCard>
            <SectionHeader
              number="01"
              icon={<FileKey2 size={18} />}
              title="Create your word dictionary"
              description="Provide at least 256 unique English words. CipherLab uses them as an encoding alphabet."
            />

            <div className="mt-6">
              <textarea
                value={sourceParagraph}
                onChange={(event) => {
                  setSourceParagraph(event.target.value);
                  setDictionary([]);
                  setDictionaryGenerated(false);
                  setResult("");
                  setFingerprint("");
                  setError("");
                }}
                rows={7}
                placeholder="Paste a long English paragraph containing at least 256 unique words..."
                className="w-full resize-y rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/10"
              />

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>
                    {sourceParagraph.length.toLocaleString()} characters
                  </span>

                  <span className="h-1 w-1 rounded-full bg-slate-700" />

                  <span>{sourceWordCount.toLocaleString()} unique words</span>

                  {sourceWordCount >= 256 && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-slate-700" />
                      <span className="font-semibold text-emerald-400">
                        Ready
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={loadExample}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-indigo-400/30 hover:bg-indigo-400/10 hover:text-white"
                  >
                    <Sparkles size={14} />
                    Use example
                  </button>

                  <button
                    type="button"
                    onClick={generateDictionary}
                    disabled={sourceWordCount < 256}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-900/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <RefreshCw size={14} />
                    Generate dictionary
                  </button>
                </div>
              </div>
            </div>

            {dictionaryGenerated && (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                    <Check size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white">
                      256-word dictionary ready
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      The dictionary has been fingerprinted and will be embedded
                      into encrypted packages for automatic compatibility
                      checking.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <MiniStat
                        label="Source words"
                        value={dictionarySourceStats.total}
                      />

                      <MiniStat
                        label="Beginning"
                        value={dictionarySourceStats.beginning}
                      />

                      <MiniStat
                        label="Middle"
                        value={dictionarySourceStats.middle}
                      />

                      <MiniStat
                        label="Ending"
                        value={dictionarySourceStats.ending}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {dictionaryGenerated && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50">
                <button
                  type="button"
                  onClick={() => setShowDictionary((value) => !value)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-white/[0.03]"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <FileKey2 size={16} className="text-indigo-400" />
                    Selected dictionary
                    <span className="rounded-full bg-indigo-400/10 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                      256
                    </span>
                  </span>

                  {showDictionary ? (
                    <ChevronUp size={17} className="text-slate-500" />
                  ) : (
                    <ChevronDown size={17} className="text-slate-500" />
                  )}
                </button>

                {showDictionary && (
                  <div className="border-t border-white/10 p-3">
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                      {dictionary.map((word, index) => (
                        <div
                          key={`${word}-${index}`}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-2 text-center"
                        >
                          <span className="mr-1 text-[9px] text-slate-600">
                            {index}
                          </span>

                          <span className="text-xs font-medium text-slate-300">
                            {word}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ToolCard>

          {/* ================================================================
              PRIVACY NOTICE
          ================================================================= */}

          <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.045] p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-cyan-400"
              />

              <div>
                <p className="text-sm font-semibold text-cyan-200">
                  Browser-based processing
                </p>

                <p className="mt-1 text-xs leading-6 text-slate-400">
                  This tool performs its cryptographic operations locally in
                  your browser. Your password and message are not intentionally
                  transmitted to a CipherLab processing server by this tool.
                </p>
              </div>
            </div>
          </div>

          {/* ================================================================
              STEP 2 — MODE
          ================================================================= */}

          <ToolCard>
            <SectionHeader
              number="02"
              icon={
                mode === "encrypt" ? <Lock size={18} /> : <Unlock size={18} />
              }
              title="Choose an operation"
              description="Select whether you want to create or recover a protected message."
            />

            <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-1.5">
              <ModeButton
                active={mode === "encrypt"}
                icon={<Lock size={16} />}
                title="Encrypt"
                description="Message → ciphertext"
                onClick={() => handleModeChange("encrypt")}
              />

              <ModeButton
                active={mode === "decrypt"}
                icon={<Unlock size={16} />}
                title="Decrypt"
                description="Ciphertext → message"
                onClick={() => handleModeChange("decrypt")}
              />
            </div>
          </ToolCard>

          {/* ================================================================
              STEP 3 — MESSAGE
          ================================================================= */}

          <ToolCard>
            <SectionHeader
              number="03"
              icon={
                mode === "encrypt" ? <Lock size={18} /> : <Unlock size={18} />
              }
              title={
                mode === "encrypt" ? "Message to encrypt" : "Encrypted message"
              }
              description={
                mode === "encrypt"
                  ? "Enter the plaintext you want to protect."
                  : "Paste the complete word-based ciphertext."
              }
            />

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="crypto-message"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  {mode === "encrypt" ? "Plaintext" : "Ciphertext"}
                </label>

                <button
                  type="button"
                  onClick={loadExample}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition hover:text-indigo-300"
                >
                  <Sparkles size={13} />
                  Load example
                </button>
              </div>

              <textarea
                id="crypto-message"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setResult("");
                  setFingerprint("");
                  setError("");
                }}
                rows={mode === "encrypt" ? 7 : 10}
                placeholder={
                  mode === "encrypt"
                    ? "Enter the message you want to encrypt..."
                    : "Paste the encrypted word sequence here..."
                }
                className={`w-full resize-y rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-7 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/10 ${
                  mode === "decrypt" ? "font-mono text-cyan-200" : "text-white"
                }`}
              />

              <div className="mt-2 flex justify-between text-xs text-slate-600">
                <span>{message.length.toLocaleString()} characters</span>

                {mode === "decrypt" && (
                  <span>
                    {message.trim()
                      ? message.trim().split(/\s+/).filter(Boolean).length
                      : 0}{" "}
                    words
                  </span>
                )}
              </div>
            </div>
          </ToolCard>

          {/* ================================================================
              STEP 4 — PASSWORD
          ================================================================= */}

          <ToolCard>
            <SectionHeader
              number="04"
              icon={<KeyRound size={18} />}
              title="Protect with a password"
              description="PBKDF2-SHA-256 derives the AES-256 key from your password."
            />

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="crypto-password"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  Password
                </label>

                <span
                  className={`text-xs font-bold ${
                    passwordStrength.label === "Strong"
                      ? "text-emerald-400"
                      : passwordStrength.label === "Moderate"
                        ? "text-amber-400"
                        : passwordStrength.label === "Weak"
                          ? "text-red-400"
                          : "text-slate-600"
                  }`}
                >
                  {passwordStrength.label}
                </span>
              </div>

              <div className="relative">
                <input
                  id="crypto-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              <div className="mt-3 grid grid-cols-6 gap-1.5">
                {Array.from({
                  length: 6,
                }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition ${
                      index < passwordStrength.score
                        ? passwordStrength.score >= 5
                          ? "bg-emerald-500"
                          : passwordStrength.score >= 3
                            ? "bg-amber-500"
                            : "bg-red-500"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-slate-500">
                <Info size={13} className="mt-0.5 shrink-0" />

                <span>
                  Use a long, unique password. The password itself is not placed
                  inside the word-based ciphertext.
                </span>
              </div>
            </div>
          </ToolCard>

          {/* ================================================================
              ERROR
          ================================================================= */}

          {error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <p className="flex-1 text-sm leading-6 text-red-200">{error}</p>

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="rounded-lg p-1 text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                  aria-label="Dismiss error"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================
              PROCESS
          ================================================================= */}

          <div className="rounded-3xl border border-indigo-400/20 bg-gradient-to-r from-indigo-500/10 via-slate-900 to-cyan-500/[0.06] p-5 sm:p-6">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div>
                <p className="text-sm font-bold text-white">
                  Ready to process?
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {mode === "encrypt"
                    ? "Encrypt your message using AES-256-GCM."
                    : "Authenticate and decrypt the supplied ciphertext."}
                </p>
              </div>

              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                <button
                  type="button"
                  onClick={handleProcess}
                  disabled={loading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                >
                  {loading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : mode === "encrypt" ? (
                    <>
                      <Lock size={16} />
                      Encrypt message
                    </>
                  ) : (
                    <>
                      <Unlock size={16} />
                      Decrypt message
                    </>
                  )}
                </button>

                <ClearButton
                  onClick={clearAll}
                  disabled={
                    !message && !password && !sourceParagraph && !result
                  }
                />
              </div>
            </div>
          </div>

          {/* ================================================================
              RESULT
          ================================================================= */}

          {result && (
            <section className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-900/80 shadow-2xl shadow-black/20">
              <div className="border-b border-white/10 bg-emerald-400/[0.04] px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                        <Check size={16} />
                      </div>

                      <h2 className="text-sm font-bold text-white">
                        {mode === "encrypt"
                          ? "Encrypted result"
                          : "Decrypted result"}
                      </h2>
                    </div>

                    {mode === "encrypt" && (
                      <p className="mt-2 text-xs text-slate-500">
                        {resultWordCount.toLocaleString()} encoded words
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-indigo-400/30 hover:bg-indigo-400/10 hover:text-white"
                    >
                      {copied ? (
                        <>
                          <Check size={14} />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-indigo-400/30 hover:bg-indigo-400/10 hover:text-white"
                    >
                      <ArrowDownToLine size={14} />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <textarea
                  value={result}
                  readOnly
                  rows={mode === "encrypt" ? 10 : 7}
                  className={`w-full resize-y rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm leading-7 outline-none ${
                    mode === "encrypt"
                      ? "font-mono text-cyan-200"
                      : "text-white"
                  }`}
                />
              </div>

              {mode === "encrypt" && (
                <div className="mx-4 mb-4 rounded-2xl border border-amber-400/15 bg-amber-400/[0.05] p-4">
                  <div className="flex items-start gap-3">
                    <Info
                      size={16}
                      className="mt-0.5 shrink-0 text-amber-400"
                    />

                    <p className="text-xs leading-6 text-amber-200/80">
                      These words are encoded ciphertext, not a readable English
                      sentence. The word dictionary is only an encoding
                      alphabet; AES-256-GCM provides the cryptographic
                      protection.
                    </p>
                  </div>
                </div>
              )}

              {fingerprint && (
                <div className="border-t border-white/10 bg-black/10 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <Fingerprint
                      size={16}
                      className="mt-0.5 shrink-0 text-slate-500"
                    />

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-500">
                        SHA-256 result fingerprint
                      </p>

                      <p className="mt-1 break-all font-mono text-[11px] leading-5 text-slate-600">
                        {fingerprint}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-white/10 px-5 py-3.5">
                <button
                  type="button"
                  onClick={useResultAsInput}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 transition hover:text-indigo-300"
                >
                  <RefreshCw size={13} />
                  Use result for{" "}
                  {mode === "encrypt" ? "decryption" : "encryption"}
                </button>
              </div>
            </section>
          )}

          {/* ================================================================
              CRYPTOGRAPHIC DETAILS
          ================================================================= */}

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
            <button
              type="button"
              onClick={() => setShowAdvanced((value) => !value)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-white/[0.03]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                  <Shield size={17} />
                </span>

                <span>
                  <span className="block text-sm font-bold text-white">
                    Cryptographic details
                  </span>

                  <span className="mt-0.5 block text-xs text-slate-600">
                    Algorithms, parameters and package structure
                  </span>
                </span>
              </span>

              {showAdvanced ? (
                <ChevronUp size={18} className="text-slate-500" />
              ) : (
                <ChevronDown size={18} className="text-slate-500" />
              )}
            </button>

            {showAdvanced && (
              <div className="border-t border-white/10 p-4 sm:p-5">
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    ["Encryption", "AES-256-GCM"],
                    ["Key derivation", "PBKDF2-SHA-256"],
                    ["AES key", "256 bits"],
                    ["PBKDF2 iterations", ITERATIONS.toLocaleString()],
                    ["Salt", `${SALT_LENGTH} bytes`],
                    ["IV / nonce", `${IV_LENGTH} bytes`],
                    ["Authentication tag", `${TAG_LENGTH} bits`],
                    ["Encoding dictionary", "256 words"],
                    ["Dictionary hash", "SHA-256"],
                    ["Processing", "Browser-side"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-slate-950/60 px-4 py-3"
                    >
                      <span className="text-xs text-slate-500">{label}</span>

                      <span className="text-right font-mono text-xs font-semibold text-slate-300">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-indigo-400/15 bg-indigo-400/[0.04] p-4">
                  <p className="text-xs leading-6 text-slate-400">
                    Each encrypted package stores its version, dictionary
                    fingerprint, random salt, random IV, and AES-GCM ciphertext.
                    This allows the decoder to identify the dictionary
                    compatibility automatically.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* ================================================================
              FINAL SECURITY NOTE
          ================================================================= */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  Security reminder
                </h3>

                <p className="mt-1 text-xs leading-6 text-slate-500">
                  AES-256-GCM provides the cryptographic protection. The
                  English-word representation is only an encoding format. Keep
                  your password private and never assume that a browser-based
                  tool is automatically appropriate for highly sensitive
                  production secrets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* UI helpers                                                                  */
/* -------------------------------------------------------------------------- */

function ToolCard({ children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/10 sm:p-6">
      {children}
    </section>
  );
}

function SectionHeader({ number, icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-400">
        {icon}

        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[8px] font-bold text-indigo-300 ring-1 ring-indigo-400/20">
          {number}
        </span>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ModeButton({ active, icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-3.5 text-left transition ${
        active
          ? "bg-indigo-500/15 text-white shadow-lg shadow-black/10 ring-1 ring-indigo-400/30"
          : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={active ? "text-indigo-400" : "text-slate-600"}>
          {icon}
        </span>

        <span className="text-sm font-bold">{title}</span>
      </div>

      <p className="mt-1 text-[11px] text-slate-600">{description}</p>
    </button>
  );
}

function StatBadge({ value, label }) {
  return (
    <div className="min-w-[76px] rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-center">
      <p className="text-xs font-bold text-white">{value}</p>

      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </p>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-emerald-400/10 bg-slate-950/40 p-3">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-200">
        {Number(value).toLocaleString()}
      </p>
    </div>
  );
}

function ExampleBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm leading-7 text-slate-700">{value}</p>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
