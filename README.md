# DT207G Projekt - Buster pizzeria backend
Webbtjänst för att visa och hantera restaurangmeny och bordsbokningar. Byggt med Express, MongoDB Atlas och Mongoose. JWT används för autentisering och bcrypt för hashning av lösenord. Innehåller grundläggande funktionalitet för CRUD.

## Installation
Webbtjänsten använder MongoDB Atlas som databas. Efter nedklonat repository kör kommando npm install för installation av nödvändiga npm paket. Server startas med kommandot npm run dev. Se filen .env.sample för exempel på variabler som krävs.

## Länk till liveversion
https://dt207g-project-backend-hbda.onrender.com

## Användning
| Metod | Ändpunkt | Beskrivning |
| ----- | -------- | ----------- |
| GET | /api/menu | Hämta meny |
| GET | /api/menu/:id | Hämta en maträtt |
| POST | /api/menu | Lägg till en maträtt - Skyddad route |
| DELETE | /api/menu/:id | Ta bort en maträtt - Skyddad route |
| PUT | /api/menu/:id | Ändra en maträtt - Skyddad route |
| POST | /api/booking | Lägg till bokning |
| GET | /api/booking | Hämta samtliga bokningar - Skyddad route |
| GET | /api/booking/:id | Hämta en bokning - Skyddad route |
| DELETE | /api/booking/:id | Ta bort bokning - Skyddad route |
| POST | /api/user/login | Logga in som administratör |
| POST | /api/user/register | Registrering av nya adminkonton - Skyddad route |

Ett menyalternativ läggs till i databasen enligt följande format:
```json
{
  "title": "Pizzanamn",
  "description": "Tomat, salami, oliver",
  "price": 175
}
```

En bokning läggs till i databasen enligt följande format:
```json
{
  "date": "2026-06-29",
  "time": "11:30",
  "guests": 2,
  "name": "David",
  "phone": "0703698532"
}
```

En användare läggs till i databasen enligt följande format:
```json
{
  "username": "användarnamn",
  "password": "lösenord"
}
```

Av Elisa L. 2026