---
headless: true
hidden: true
---

__Prerequisites__

- **OpenSSL** installed on your machine.  
  A quick Google search will point you to installation instructions for your operating system.


1. Generate SSL Certificate and Private Key

    Open a console where `openssl` is available, navigate to a suitable directory, and run:

    ```bash
    openssl req -x509 -newkey rsa:2048 -nodes -keyout private.pem -out public.pem -days 720
    ```

    __Explanation of Flags__
    - **`req -x509`**: Generate an X.509 certificate.
    - **`-newkey rsa:2048`**: Create a new RSA key with 2048-bit encryption.
    - **`-nodes`**: Do not encrypt the private key.
    - **`-keyout private.pem`**: Output private key to `private.pem`.
    - **`-out public.pem`**: Output certificate to `public.pem`.
    - **`-days 720`**: Valid for 720 days.

    Answer any prompts with values representing your organization, or leave them blank if you prefer.

    **Result:** Two files will be created in the directory:
    - `public.pem` (certificate)
    - `private.pem` (private key)


2.  Base64 Encode the Private Key

    __Windows__

    Use `certutil` to encode the private key:

    ```cmd
    certutil -encode -f "private.pem" "privatebase64.txt"
    ```

    This generates a file `privatebase64.txt` containing the private key as a Base64-encoded string.


    __Linux / macOS__
    Use the `base64` command:

    ```bash
    base64 private.pem > privatebase64.txt
    ```

    This creates `privatebase64.txt` with the Base64-encoded private key.

__Notes__
- Keep your private key secure. Do **not** share `private.pem` or its Base64 representation publicly.
- The generated certificate (`public.pem`) can be distributed as needed.


__Troubleshooting__
- **OpenSSL not found:** Ensure it’s installed and added to your system PATH.
- **Permission issues:** Run the commands with appropriate privileges or in a directory where you have write access.
- **Invalid Base64 output:** Verify the original file exists and is readable before encoding.
