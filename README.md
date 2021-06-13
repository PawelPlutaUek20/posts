# Przygotuj REST API do zarządzania tabelą w bazie danych.

## Struktura tabeli Posts:

| Field         | Type          |
| ------------- |:------------- |
| ``id``        | ``uuid``      |
| ``title``     | ``varchar``   |
| ``lead``      | ``varchar``   |
| ``content``   | ``text``      |
| ``createdAt`` | ``timestamp`` |
| ``updatedAt`` | ``timestamp`` |

## Endpoints:

| Method     | Url       | Action                      |
| ---------- |:--------- |:--------------------------- |
| ``POST``   | ``/``     | ``add record``              |
| ``GET``    | ``/{id}`` | ``show record``             |
| ``PUT``    | ``/{id}`` | ``edit record``             |
| ``GET``    | ``/``     | ``show all records``        |
| ``DELETE`` | ``/{id}`` | ``delete record``           |
| ``-``      | ``-``     | ``delete records in batch`` |

## Technologie:
- JS (express)
- Baza danych (MYSQL)

## Nice to have:
- Autoryzacja API (dowolna, preferowana JWT)
- Dodanie tabeli Users

    | Field         | Type          |
    | ------------- |:------------- |
    | ``id``        | ``uuid``      |
    | ``email``     | ``varchar``   |
    | ``password``  | ``varchar``   |
    | ``createdAt`` | ``timestamp`` |
    | ``updatedAt`` | ``timestamp`` |

- do tabeli Posts dodanie kolumny author w której to znajdowało by się ID użytkownika który utworzył dany post. Użytkownik mógłby przeprowadzać operacje UD (edit record, delete record, delete records in batch) tylko na postach, które zostały utworzone przez niego.