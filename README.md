# Przygotuj REST API do zarządzania tabelą w bazie danych.

## Struktura tabeli:

## Nazwa: Posts
### Kolumny:
- ID (uuid)
- title (varchar)
- lead (varchar)
- content (text)
- createdAt (timestamp)
- updatedAt (timestamp)
### Endpoints:
- add record
- show record
- edit record
- show all records
- delete record
- delete records in batch
### Technologie:
- JS (framework lub biblioteka dowolne, preferowane express)
- Baza danych (dowolna, preferowana MYSQL)
### Nice to have:
- Autoryzacja API (dowolna, preferowana JWT)
- Dodanie tabeli
### Users 
- ID (uuid)
- email (varchar)
- password (varchar)
- createdAt (timestamp)
- updatedAt (timestamp)