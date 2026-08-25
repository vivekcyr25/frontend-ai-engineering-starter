# DNS Walkthrough — How the Web Finds Your Portfolio

**Author:** Vivek  
**Topic:** Plain-Language DNS & Web Traffic Lifecycle  
**Deployment Context:** Free Public Hosting via Netlify Subdomain (`*.netlify.app`)  

---

## 1. What DNS Does (The Internet's Phonebook)

Computers on the internet don't communicate using human-readable names like `github.com` or `vivek-sharma.netlify.app`. They communicate using numeric **IP addresses** (like `75.2.60.5` for IPv4 or `2600:1f18:...` for IPv6), which tell routers exactly which machine in the world to contact.

**DNS (Domain Name System)** is the global directory service that translates human-friendly domain names into machine-routable IP addresses.

---

## 2. What Happens When You Type a Website Address

When a visitor types your portfolio address into their browser and presses Enter, a sequential lookup occurs:

```
[ Browser ] ──► [ Local Cache ] ──► [ Recursive Resolver ] ──► [ Authoritative Nameserver ] ──► [ IP Address Returned ]
```

1. **Browser Cache Check:** The browser checks if it already looked up this address recently.
2. **Operating System Cache Check:** If not in the browser, your computer's OS checks its local network cache.
3. **Recursive Resolver Query:** If unknown locally, the request goes out to your Internet Service Provider's (or public DNS like `8.8.8.8`) **Recursive Resolver**.

---

## 3. What a DNS Resolver Does

A **DNS Resolver** is the "librarian" of the process. It doesn't store every website's address itself; instead, it travels across the global DNS hierarchy to find the answer for your browser:
- It asks the **Root DNS Servers** (which know where to find top-level domains like `.com`, `.app`, `.org`).
- It asks the **TLD (Top-Level Domain) Servers** (which know who manages `netlify.app`).
- It asks the **Authoritative Nameserver** that holds the actual records for that specific site.

---

## 4. What a Nameserver Does

A **Nameserver** is a server specifically configured to hold the official master records for a domain. 
- When Netlify hosts your site, Netlify's authoritative nameservers hold the definitive answer: *"The address `vivek-sharma.netlify.app` points to our globally distributed edge network."*

---

## 5. What a DNS Record Is

A **DNS Record** is a single entry inside the nameserver database. Common types include:
- **A Record:** Maps a domain directly to an IPv4 address (e.g. `example.com` → `75.2.60.5`).
- **AAAA Record:** Maps a domain to an IPv6 address.
- **CNAME Record (Canonical Name):** Maps an alias name to another domain name.
- **TXT Record:** Stores text verification data (used for proving ownership or email security).

---

## 6. What a CNAME Record Does & Pointing a Custom Domain

A **CNAME (Canonical Name) Record** acts as an alias or redirect pointer in DNS.
- If you later purchase a custom domain (such as `viveksharma.dev` or `vivek.engineer`), you would create a CNAME record:
  ```
  www.viveksharma.dev  CNAME  vivek-sharma.netlify.app.
  ```
- This tells the internet: *"Whenever someone visits `www.viveksharma.dev`, look up whatever IP address `vivek-sharma.netlify.app` points to."*

> **Note for This Assignment:** For this milestone, we use Netlify's free, pre-configured subdomain (`https://<your-name>.netlify.app`). Netlify automatically handles the DNS routing and nameservers for all `*.netlify.app` addresses out of the box. A custom domain can be connected later without changing any application code.

---

## 7. What Happens After the DNS Lookup Succeeds

Once the browser receives the target IP address:
1. **TCP Handshake:** The browser opens a network connection to the server at that IP.
2. **HTTP/HTTPS Request:** The browser sends a `GET /` request asking for the portfolio HTML.
3. **Response & Rendering:** Netlify's nearest CDN Edge server returns the HTML, CSS, JavaScript, and assets to render the page on the visitor's screen.

---

## 8. How HTTPS and SSL Fit In

**HTTPS (Hypertext Transfer Protocol Secure)** encrypts all communication between the visitor's browser and the hosting server so passwords, messages, and traffic cannot be intercepted.

- **SSL/TLS Certificate:** When using Netlify, a free Let's Encrypt SSL/TLS certificate is automatically provisioned and renewed.
- **TLS Handshake:** Before sending website data, the browser and server exchange cryptographic keys.
- **Trust Indicator:** The browser verifies the certificate's validity, displays the secure padlock icon, and enforces HTTPS encryption across all portfolio routes.
