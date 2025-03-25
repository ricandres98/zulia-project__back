const verificationCodeHTMLTemplate = (code: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" cross-origin="" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
    <style>
        html {
            font-size: 62.5%;
        }
        * {
            font-family: "Lato", sans-serif;
            color: rgba(2, 24, 38, 0.80);
        }
        p {
            font-size: 1.4rem;
        }
        h1 {
            font-size:1.6rem
        }
        h2 {
            font-size: 1.6rem;
        }
    </style>
</head>
<body>
    <h1>Código de verificación sistema Zulia</h1>
    <p>Su código de verificación es:</p>
    <h2>${code}</h2>
</body>
</html>`

export { verificationCodeHTMLTemplate };