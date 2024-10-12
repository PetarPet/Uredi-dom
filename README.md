# Uredi-dom
Aplikacija Uredi dom spaja klijente sa agencijama koje vrse adaptaciju prostora.
FE deo je realizovan u Angularu. Dok je BE deo napisan u Node.js koji se izvrsava na Express serveru. Baza je NO-SQL Mongo db.
Aplikacija razlikuje tri vrste korisnika, to su klijenti, agencije i admin.
Gosti imaju pristup do pocetne strane gde mogu da pretrazuju sve agencije. Takodje oni mogu da se registruju
ili da se uloguju ako vec poseduju nalog.
Registrovani korisnici mogu biti klijenti ili agencije.
Prilikom registracije novog naloga bira se kojoj vrsti korisnika novi nalog pripada.
Klijenti nakon logovanja imaju pristup do svojih informacija. Tu mogu dodati svoju nekretninu, izbrisati je, zatraziti ponudu od agencije.
Klijenti podatke o nekretnini mogu unositi preko forme ili preko canvasa.
Agencije po logovanju vide ponude poslova koje su im pristigle. Mogu da prihvataju poslove, da ih odbijaju. 
Takodje agencije u okviru svog pocetnog ekrana imaju deo za rukovodjenje majstorima koje zaposljavaju.
Admin odobrava registraciju novih korisnika i brise postojece.
