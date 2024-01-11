<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Heatwave Kontaktanfrage</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        main {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            margin: 10px 0;
            color: #666666;
        }
    </style>
</head>

<body>
    <main>
        <h1>Heatwave Kontaktanfrage</h1>

        <p>Name: {{$contactName}}</p>
        <p>Email: {{$contactEmail}}</p>
        <p>Message: {{$contactMessage}}</p>
    </main>
</body>

</html>