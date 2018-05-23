Ko exportaš collection iz mongo DB v obliki JSON, pojdi na naslov: "/json.html" in v prvo vnosno polje kopiraj vsebino exportane datoteke
   --> S tem se JSON export popravi v uporabno obliko, ki jo lahko direktno kopiraš v Kontroller!
   
Exportaš s tem ukazom:
mongoexport --db tpo --collection ImeCollection --out ~/workspace/tpo-projekt/app_api/models/data/ImeDatoteke.json