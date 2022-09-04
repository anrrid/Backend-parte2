import "dotenv/config"

export const firebaseData =  {
    "type": "service_account",
  "project_id": "ecommerce-10e65",
  "private_key_id": "4a6410e0edcf569c3afcaaedc0552c6b015a21ab",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC5k50xyocYf1/w\nm3ce3ima56eRDebTgMgom6zYn3h7RwTIex7ipocI/4N7aOBMODrN3WOE3sB7Usb0\nz60VL+EOjVjyJQ7jwnDl69HSi1L5qKzs/KjwU2Cjj6195mMsGPBxdzhWYQuJRTEZ\nA+OGvKQZXtZDH4LSAkWwQj/VkxL/lwP73IdHjhDPND8g9eSHRyYIjuUQekQ3op/Y\nHf8aVOcxrenxRNJSRBGrds1R/h44nKlCUkxhk6J9qzGTJ/vFBHLGaWjGMom3WE5A\nUtbZOpyT7mBwVl9/P3uFIjVcHJPZiDvg38TS+8kC8t6V/aId2DfPNaMh8ExLPdiC\nkw/bUoTNAgMBAAECggEABQwOtzWOFwx5Zeg664v/Qnp3N2q5X5pqo/zks1ki91Dz\n84yyeleTgWfxm4AITNct29hGX9OIrwUnt0cuqrTZDU93nwS2MvUtPOBjauZ/JNGB\nlbBv2v/P6qLg63VCNtQDnHjLMqfRBU3scYTswaCMlf2n6Vg7ppqJN3hil0LSV9rB\nUwbIrZ5jGlsO7i71o4DFcmZYgT8bMkUfdEKF2HpmF1YIr6m4P5M3/ipwt502hf7E\nvDG40zNkJ9AMVPdORasEC+V0bz0hq3243+jmFM3gJY4B7ISV6dwZlfPE7xmhtsgf\n9Sm76rqo/SsTM44k8yYlQ+fzyhzRUdueJcioA8j3wQKBgQDjlCt0CGdRPRO9/+t2\nOqKENNM1xv3bAHbpeXNxeIqwokwQ/Vy1ZZ+r3JAvZXTXB3UZ1YR/mXMGYUQhQyxt\n0JhCb+V0ACWXS+oasswsTDV+5t4QJ2W+CE0zl4fgjrFAUkhD4jnTsR6sWGwmidYz\nau3ujO50y4tpyu9hR4zUpWLhcwKBgQDQwJwXNd0bnWvsumRskR9wp0vQNRbju327\n6o/S1MVc6vDIDGE7TVnGIFxvqxwo214XRbqx4JH+shb072cYuwRNODIZU9f2PKNZ\nHvdUA/LwmgaByhLAe0DWkg/OL4VoJrLSPK6E8ZRrg1XynTIpHN6BubcjeFFRdMvv\n58cfOe5wvwKBgQDWOTTKLdrrmv3JfW0tRraSkpM67Q0rKP3Gev/TkW+kI7JMz+KE\nEpxCEAZdxzg77ZYqclYeMtkW6VpToULiQFgDOgeYsUaxa9F7vlD5Zed5hGMGe7+H\nKZNafEp4dHmfnZTO6dYbUoAYJcfwYxGSJxa/1kPlB3E9bbz2Kn8D8IbqxwKBgQDN\n+Y7KlBpEOjMYVN3sBdGo3Vm/6fJY6FHqzkn1NH487ZCBQz3ZPrxa8uliQcq6QaF4\ngxPwmW5UijJ+oY3vZ/CZpN5CAWmxDCn9MMHHw1G9t6y9+b5A8ByM23f+8QLIPo7p\nRHjKsnfJEcEHb7XjvRmLlMywkfJi1kS3xdHC7O1pjwKBgQCOCKI5fvEwHGK9RkfP\naj7mS+ZeDYXQ17jqET7xJ1K/0FS1t4XR24Bx/kFChTqtXa1fVZeNlyXRqkeZiS20\n0ZrxALI5TO2uyuB9jMtJBo7OXwq2lWgNviRlZEfhZEcwdP04s8BF50DowBtj2Ol/\nhHe+BQBlnixxfTDP95VE3cSsfg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-a4avb@ecommerce-10e65.iam.gserviceaccount.com",
  "client_id": "117618450006849037510",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-a4avb%40ecommerce-10e65.iam.gserviceaccount.com"
}

export const variables = {
    TIPO_PERSISTENCIA: process.env.PERSISTENCIA || "mongo",
}
