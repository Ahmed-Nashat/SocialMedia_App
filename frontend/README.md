# Firebase notification tester

Serve this folder over localhost or HTTPS, for example:

```sh
cd frontend
python -m http.server 5500
```

Open http://localhost:5500 and click **Get FCM token**. Run the Express backend and click **Send token**. The existing `POST /` route logs the token in the backend terminal.

This step only sends the token to the backend; it does not send a notification or save the token. The service worker and page both need the Firebase web config; update both if the project changes. The browser downloads the Firebase SDK from Google's CDN, so an internet connection is required.
