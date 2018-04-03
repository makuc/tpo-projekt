Ko exportaš collection iz mongo DB v obliki JSON, v "fix" skripti popravi ime exportane datoteke ter jo poženi
   --> S tem se JSON export popravi v uporabno obliko, ki jo lahko direktno kopiraš v Kontroller!
   
Exportaš s tem ukazom:
mongoexport --db tpo --collection ImeCollection --out tpo-projekt/app_api/models/data/ImeDatoteke.json