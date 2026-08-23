# 0003. Lab Diagnostic Engine Architecture (DoH Censorship & Device Fingerprint Scanner)

The `/lab` suite runs directly in the client's browser to measure real client-side ISP censorship and tracking vectors:

1. **DoH Censorship & Poisoning Prober (`/lab/doh`)**:
   - Executes direct client-side browser fetch requests against both major (Cloudflare, Google, Quad9, ControlD) and non-mainstream/alternative DoH resolvers (DNSforge, LibreDNS, BlahDNS, AppliedPrivacy, etc.).
   - Resolves domains (such as `youtube.com`) to evaluate three states:
     - **Accessible & Genuine**: Returns valid public IPs.
     - **DNS Poisoned / Hijacked**: Returns known ISP sinkhole/filtering IPs (e.g. `10.10.34.35`).
     - **Blocked / Unreachable**: TLS handshake or connection timed out by ISP firewall.
   - For resolvers lacking CORS headers, a dual-mode fallback (client reachability probe + server proxy validation) is provided.

2. **IP & Identity Exposure Scanner (`/lab/ipinfo`)**:
   - Evaluates WebRTC local interface leaks, Timezone/NTP delta, and Datacenter/Proxy flags.
   - Generates client-side **Hardware & Canvas Fingerprints** (Canvas 2D render hash, WebGL GPU vendor/renderer, AudioContext hash, CPU concurrency, and device memory) to show how tracking scripts uniquely identify devices across VPNs.
