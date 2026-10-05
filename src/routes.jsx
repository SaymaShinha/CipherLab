import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";

// General pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import CookiePolicy from "./pages/CookiePolicy.jsx";
import NotFound from "./pages/NotFound.jsx";

// Encryption tools
import AESGCM from "./pages/encryption/AESGCM.jsx";
import AESCBC from "./pages/encryption/AESCBC.jsx";
import ChaCha20 from "./pages/encryption/ChaCha20.jsx";
import CryptographyMessage from "./pages/encryption/CryptographyMessage.jsx";
import CustomEncryption from "./pages/encryption/CustomEncryption.jsx";

// Hashing tools
import Checksum from "./pages/hashing/Checksum.jsx";
import FileHash from "./pages/hashing/FileHash.jsx";
import SHAHash from "./pages/hashing/SHAHash.jsx";
import SHA256 from "./pages/hashing/SHA256.jsx";
import SHA384 from "./pages/hashing/SHA384.jsx";
import SHA512 from "./pages/hashing/SHA512.jsx";
import SHA3 from "./pages/hashing/SHA3.jsx";

// Encoding tools
import Base64 from "./pages/encoding/Base64.jsx";
import Base64Url from "./pages/encoding/Base64Url.jsx";
import Hex from "./pages/encoding/Hex.jsx";

//Authentication & Keys tools
import HMAC from "./pages/authenticationKeys/HMAC.jsx";
import PBKDF2 from "./pages/authenticationKeys/PBKDF2.jsx";
import JWTInspector from "./pages/authenticationKeys/JWTInspector.jsx";
import RSAKeyPair from "./pages/authenticationKeys/RSAKeyPair.jsx";

// Security tools
import PasswordStrength from "./pages/security/PasswordStrength.jsx";
import PasswordGenerator from "./pages/security/PasswordGenerator.jsx";
import RandomBytes from "./pages/security/RandomBytes.jsx";
import UUIDULID from "./pages/security/UUIDULID.jsx";

// Learning pages
import EncryptionVsHashing from "./pages/learn/EncryptionVsHashing.jsx";
import AESExplained from "./pages/learn/AESExplained.jsx";
import PasswordEncryption from "./pages/learn/PasswordEncryption.jsx";
import SaltAndIV from "./pages/learn/SaltAndIV.jsx";
import CryptographyBasics from "./pages/learn/CryptographyBasics.jsx";
import WhatIsHMAC from "./pages/learn/WhatIsHMAC.jsx";
import WhatIsPBKDF2 from "./pages/learn/WhatIsPBKDF2.jsx";
import WhatIsAESGCM from "./pages/learn/WhatIsAESGCM.jsx";
import WhatIsRSA from "./pages/learn/WhatIsRSA.jsx";
import WhatIsSHA256 from "./pages/learn/WhatIsSHA256.jsx";
import WhatIsBase64 from "./pages/learn/WhatIsBase64.jsx";
import CryptographicRandomness from "./pages/learn/CryptographicRandomness.jsx";
import PasswordHashingVsEncryption from "./pages/learn/PasswordHashingVsEncryption.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      // =========================================================
      // HOME
      // =========================================================

      {
        index: true,
        Component: Home,
      },

      // =========================================================
      // ENCRYPTION TOOLS
      // =========================================================

      {
        path: "tools/encryption/aes-256-gcm",
        Component: AESGCM,
      },
      {
        path: "tools/encryption/aes-256-cbc",
        Component: AESCBC,
      },
      {
        path: "tools/encryption/chacha20",
        Component: ChaCha20,
      },
      {
        path: "tools/encryption/cryptography-message",
        Component: CryptographyMessage,
      },
      {
        path: "tools/encryption/custom-encryption",
        Component: CustomEncryption,
      },

      // ========================================================
      // Authentication & Keys tools
      // ========================================================
      {
        path: "tools/authentication-keys/hmac",
        Component: HMAC,
      },
      {
        path: "tools/authentication-keys/pbkdf2",
        Component: PBKDF2,
      },
      {
        path: "tools/authentication-keys/rsa-key-pair",
        Component: RSAKeyPair,
      },
      {
        path: "tools/authentication-keys/jwt-decoder",
        Component: JWTInspector,
      },

      // =========================================================
      // HASHING TOOLS
      // =========================================================

      {
        path: "tools/hashing/checksum",
        Component: Checksum,
      },
      {
        path: "tools/hashing/file-hash",
        Component: FileHash,
      },
      {
        path: "tools/hashing/sha-hash",
        Component: SHAHash,
      },
      {
        path: "tools/hashing/sha-256",
        Component: SHA256,
      },
      {
        path: "tools/hashing/sha-384",
        Component: SHA384,
      },
      {
        path: "tools/hashing/sha-512",
        Component: SHA512,
      },
      {
        path: "tools/hashing/sha-3",
        Component: SHA3,
      },

      // =========================================================
      // ENCODING TOOLS
      // =========================================================

      {
        path: "tools/encoding/base64",
        Component: Base64,
      },
      {
        path: "tools/encoding/base64url",
        Component: Base64Url,
      },
      {
        path: "tools/encoding/hex",
        Component: Hex,
      },

      // =========================================================
      // SECURITY / CRYPTOGRAPHY TOOLS
      // =========================================================
      {
        path: "tools/security/password-strength",
        Component: PasswordStrength,
      },
      {
        path: "tools/security/password-generator",
        Component: PasswordGenerator,
      },
      {
        path: "tools/security/random-bytes",
        Component: RandomBytes,
      },
      {
        path: "tools/security/uuid-ulid",
        Component: UUIDULID,
      },

      // =========================================================
      // LEARNING / EDUCATIONAL CONTENT
      // =========================================================

      {
        path: "learn/cryptography-basics",
        Component: CryptographyBasics,
      },
      {
        path: "learn/encryption-vs-hashing",
        Component: EncryptionVsHashing,
      },
      {
        path: "learn/aes-256-explained",
        Component: AESExplained,
      },
      {
        path: "learn/password-based-encryption",
        Component: PasswordEncryption,
      },
      {
        path: "learn/salt-and-iv",
        Component: SaltAndIV,
      },
      { path: "learn/what-is-hmac", Component: WhatIsHMAC },
      { path: "learn/what-is-pbkdf2", Component: WhatIsPBKDF2 },
      { path: "learn/what-is-aes-gcm", Component: WhatIsAESGCM },
      { path: "learn/what-is-rsa", Component: WhatIsRSA },
      { path: "learn/what-is-sha-256", Component: WhatIsSHA256 },
      { path: "learn/what-is-base64", Component: WhatIsBase64 },
      {
        path: "learn/cryptographic-randomness",
        Component: CryptographicRandomness,
      },
      {
        path: "learn/password-hashing-vs-encryption",
        Component: PasswordHashingVsEncryption,
      },

      // =========================================================
      // INFORMATIONAL PAGES
      // =========================================================

      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "terms-of-use",
        Component: TermsOfUse,
      },
      {
        path: "cookie-policy",
        Component: CookiePolicy,
      },

      // =========================================================
      // 404
      // =========================================================

      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
