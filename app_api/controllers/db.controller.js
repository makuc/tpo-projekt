var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var ISODate = Date;
var callNext = require("./_include/callNext");

var zacetniPodatki = {
    obcine: [
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6356"), "sifra": 213, "ime": "Ankaran" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6357"), "sifra": 1, "ime": "Ajdovščina" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6358"), "sifra": 195, "ime": "Apače" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6359"), "sifra": 2, "ime": "Beltinci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada635a"), "sifra": 148, "ime": "Benedikt" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada635b"), "sifra": 149, "ime": "Bistrica ob Sotli" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada635c"), "sifra": 3, "ime": "Bled" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada635d"), "sifra": 150, "ime": "Bloke" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada635e"), "sifra": 4, "ime": "Bohinj" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada635f"), "sifra": 5, "ime": "Borovnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6360"), "sifra": 6, "ime": "Bovec" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6361"), "sifra": 151, "ime": "Braslovče" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6362"), "sifra": 7, "ime": "Brda" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6363"), "sifra": 8, "ime": "Brezovica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6364"), "sifra": 9, "ime": "Brežice" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6365"), "sifra": 152, "ime": "Cankova" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6366"), "sifra": 11, "ime": "Celje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6367"), "sifra": 12, "ime": "Cerklje na Gorenjskem" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6368"), "sifra": 13, "ime": "Cerknica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6369"), "sifra": 14, "ime": "Cerkno" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada636a"), "sifra": 153, "ime": "Cerkvenjak" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada636b"), "sifra": 196, "ime": "Cirkulane" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada636c"), "sifra": 15, "ime": "Črenšovci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada636d"), "sifra": 16, "ime": "Črna na Koroškem" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada636e"), "sifra": 17, "ime": "Črnomelj" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada636f"), "sifra": 18, "ime": "Destrnik" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6370"), "sifra": 19, "ime": "Divača" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6371"), "sifra": 154, "ime": "Dobje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6372"), "sifra": 20, "ime": "Dobrepolje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6373"), "sifra": 155, "ime": "Dobrna" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6374"), "sifra": 21, "ime": "Dobrova - Polhov Gradec" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6375"), "sifra": 156, "ime": "Dobrovnik" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6376"), "sifra": 22, "ime": "Dol pri Ljubljani" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6377"), "sifra": 157, "ime": "Dolenjske Toplice" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6378"), "sifra": 23, "ime": "Domžale" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6379"), "sifra": 24, "ime": "Dornava" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada637a"), "sifra": 25, "ime": "Dravograd" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada637b"), "sifra": 26, "ime": "Duplek" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada637c"), "sifra": 27, "ime": "Gorenja vas - Poljane" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada637d"), "sifra": 28, "ime": "Gorišnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada637e"), "sifra": 207, "ime": "Gorje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada637f"), "sifra": 29, "ime": "Gornja Radgona" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6380"), "sifra": 30, "ime": "Gornji Grad" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6381"), "sifra": 31, "ime": "Gornji Petrovci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6382"), "sifra": 158, "ime": "Grad" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6383"), "sifra": 32, "ime": "Grosuplje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6384"), "sifra": 159, "ime": "Hajdina" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6385"), "sifra": 160, "ime": "Hoče - Slivnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6386"), "sifra": 161, "ime": "Hodoš" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6387"), "sifra": 162, "ime": "Horjul" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6388"), "sifra": 34, "ime": "Hrastnik" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6389"), "sifra": 35, "ime": "Hrpelje - Kozina" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada638a"), "sifra": 36, "ime": "Idrija" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada638b"), "sifra": 37, "ime": "Ig" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada638c"), "sifra": 38, "ime": "Ilirska Bistrica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada638d"), "sifra": 39, "ime": "Ivančna Gorica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada638e"), "sifra": 40, "ime": "Izola" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada638f"), "sifra": 41, "ime": "Jesenice" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6390"), "sifra": 163, "ime": "Jezersko" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6391"), "sifra": 42, "ime": "Juršinci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6392"), "sifra": 43, "ime": "Kamnik" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6393"), "sifra": 44, "ime": "Kanal" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6394"), "sifra": 45, "ime": "Kidričevo" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6395"), "sifra": 46, "ime": "Kobarid" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6396"), "sifra": 47, "ime": "Kobilje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6397"), "sifra": 48, "ime": "Kočevje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6398"), "sifra": 49, "ime": "Komen" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6399"), "sifra": 164, "ime": "Komenda" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada639a"), "sifra": 50, "ime": "Koper" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada639b"), "sifra": 197, "ime": "Kostanjevica na Krki" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada639c"), "sifra": 165, "ime": "Kostel" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada639d"), "sifra": 51, "ime": "Kozje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada639e"), "sifra": 52, "ime": "Kranj" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada639f"), "sifra": 53, "ime": "Kranjska Gora" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a0"), "sifra": 166, "ime": "Križevci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a1"), "sifra": 54, "ime": "Krško" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a2"), "sifra": 55, "ime": "Kungota" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a3"), "sifra": 56, "ime": "Kuzma" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a4"), "sifra": 57, "ime": "Laško" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a5"), "sifra": 58, "ime": "Lenart" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a6"), "sifra": 59, "ime": "Lendava" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a7"), "sifra": 60, "ime": "Litija" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a8"), "sifra": 61, "ime": "Ljubljana" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63a9"), "sifra": 62, "ime": "Ljubno" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63aa"), "sifra": 63, "ime": "Ljutomer" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ab"), "sifra": 208, "ime": "Log - Dragomer" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ac"), "sifra": 64, "ime": "Logatec" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ad"), "sifra": 65, "ime": "Loška dolina" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ae"), "sifra": 66, "ime": "Loški Potok" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63af"), "sifra": 167, "ime": "Lovrenc na Pohorju" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b0"), "sifra": 67, "ime": "Luče" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b1"), "sifra": 68, "ime": "Lukovica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b2"), "sifra": 69, "ime": "Majšperk" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b3"), "sifra": 198, "ime": "Makole" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b4"), "sifra": 70, "ime": "Maribor" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b5"), "sifra": 168, "ime": "Markovci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b6"), "sifra": 71, "ime": "Medvode" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b7"), "sifra": 72, "ime": "Mengeš" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b8"), "sifra": 73, "ime": "Metlika" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63b9"), "sifra": 74, "ime": "Mežica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ba"), "sifra": 169, "ime": "Miklavž na Dravskem polju" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63bb"), "sifra": 75, "ime": "Miren - Kostanjevica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63bc"), "sifra": 212, "ime": "Mirna" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63bd"), "sifra": 170, "ime": "Mirna Peč" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63be"), "sifra": 76, "ime": "Mislinja" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63bf"), "sifra": 199, "ime": "Mokronog - Trebelno" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c0"), "sifra": 77, "ime": "Moravče" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c1"), "sifra": 78, "ime": "Moravske Toplice" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c2"), "sifra": 79, "ime": "Mozirje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c3"), "sifra": 80, "ime": "Murska Sobota" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c4"), "sifra": 81, "ime": "Muta" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c5"), "sifra": 82, "ime": "Naklo" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c6"), "sifra": 83, "ime": "Nazarje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c7"), "sifra": 84, "ime": "Nova Gorica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c8"), "sifra": 85, "ime": "Novo mesto" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63c9"), "sifra": 86, "ime": "Odranci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ca"), "sifra": 171, "ime": "Oplotnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63cb"), "sifra": 87, "ime": "Ormož" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63cc"), "sifra": 88, "ime": "Osilnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63cd"), "sifra": 89, "ime": "Pesnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ce"), "sifra": 90, "ime": "Piran" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63cf"), "sifra": 91, "ime": "Pivka" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d0"), "sifra": 92, "ime": "Podčetrtek" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d1"), "sifra": 172, "ime": "Podlehnik" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d2"), "sifra": 93, "ime": "Podvelka" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d3"), "sifra": 200, "ime": "Poljčane" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d4"), "sifra": 173, "ime": "Polzela" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d5"), "sifra": 94, "ime": "Postojna" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d6"), "sifra": 174, "ime": "Prebold" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d7"), "sifra": 95, "ime": "Preddvor" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d8"), "sifra": 175, "ime": "Prevalje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63d9"), "sifra": 96, "ime": "Ptuj" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63da"), "sifra": 97, "ime": "Puconci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63db"), "sifra": 98, "ime": "Rače - Fram" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63dc"), "sifra": 99, "ime": "Radeče" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63dd"), "sifra": 100, "ime": "Radenci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63de"), "sifra": 101, "ime": "Radlje ob Dravi" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63df"), "sifra": 102, "ime": "Radovljica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e0"), "sifra": 103, "ime": "Ravne na Koroškem" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e1"), "sifra": 176, "ime": "Razkrižje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e2"), "sifra": 209, "ime": "Rečica ob Savinji" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e3"), "sifra": 201, "ime": "Renče - Vogrsko" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e4"), "sifra": 104, "ime": "Ribnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e5"), "sifra": 177, "ime": "Ribnica na Pohorju" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e6"), "sifra": 106, "ime": "Rogaška Slatina" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e7"), "sifra": 105, "ime": "Rogašovci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e8"), "sifra": 107, "ime": "Rogatec" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63e9"), "sifra": 108, "ime": "Ruše" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ea"), "sifra": 178, "ime": "Selnica ob Dravi" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63eb"), "sifra": 109, "ime": "Semič" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ec"), "sifra": 110, "ime": "Sevnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ed"), "sifra": 111, "ime": "Sežana" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ee"), "sifra": 112, "ime": "Slovenj Gradec" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ef"), "sifra": 113, "ime": "Slovenska Bistrica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f0"), "sifra": 114, "ime": "Slovenske Konjice" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f1"), "sifra": 179, "ime": "Sodražica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f2"), "sifra": 180, "ime": "Solčava" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f3"), "sifra": 202, "ime": "Središče ob Dravi" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f4"), "sifra": 115, "ime": "Starše" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f5"), "sifra": 203, "ime": "Straža" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f6"), "sifra": 204, "ime": "Sv. Trojica v Slov. Goricah" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f7"), "sifra": 181, "ime": "Sveta Ana" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f8"), "sifra": 182, "ime": "Sveti Andraž v Slov. Goricah" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63f9"), "sifra": 116, "ime": "Sveti Jurij ob Ščavnici" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63fa"), "sifra": 210, "ime": "Sveti Jurij v Slov. Goricah" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63fb"), "sifra": 205, "ime": "Sveti Tomaž" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63fc"), "sifra": 33, "ime": "Šalovci" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63fd"), "sifra": 183, "ime": "Šempeter - Vrtojba" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63fe"), "sifra": 117, "ime": "Šenčur" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada63ff"), "sifra": 118, "ime": "Šentilj" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6400"), "sifra": 119, "ime": "Šentjernej" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6401"), "sifra": 120, "ime": "Šentjur pri Celju" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6402"), "sifra": 211, "ime": "Šentrupert" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6403"), "sifra": 121, "ime": "Škocjan" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6404"), "sifra": 122, "ime": "Škofja Loka" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6405"), "sifra": 123, "ime": "Škofljica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6406"), "sifra": 124, "ime": "Šmarje pri Jelšah" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6407"), "sifra": 206, "ime": "Šmarješke Toplice" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6408"), "sifra": 125, "ime": "Šmartno ob Paki" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6409"), "sifra": 194, "ime": "Šmartno pri Litiji" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada640a"), "sifra": 126, "ime": "Šoštanj" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada640b"), "sifra": 127, "ime": "Štore" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada640c"), "sifra": 184, "ime": "Tabor" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada640d"), "sifra": 10, "ime": "Tišina" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada640e"), "sifra": 128, "ime": "Tolmin" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada640f"), "sifra": 129, "ime": "Trbovlje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6410"), "sifra": 130, "ime": "Trebnje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6411"), "sifra": 185, "ime": "Trnovska vas" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6412"), "sifra": 186, "ime": "Trzin" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6413"), "sifra": 131, "ime": "Tržič" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6414"), "sifra": 132, "ime": "Turnišče" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6415"), "sifra": 133, "ime": "Velenje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6416"), "sifra": 187, "ime": "Velika Polana" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6417"), "sifra": 134, "ime": "Velike Lašče" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6418"), "sifra": 188, "ime": "Veržej" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6419"), "sifra": 135, "ime": "Videm" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada641a"), "sifra": 136, "ime": "Vipava" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada641b"), "sifra": 137, "ime": "Vitanje" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada641c"), "sifra": 138, "ime": "Vodice" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada641d"), "sifra": 139, "ime": "Vojnik" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada641e"), "sifra": 189, "ime": "Vransko" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada641f"), "sifra": 140, "ime": "Vrhnika" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6420"), "sifra": 141, "ime": "Vuzenica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6421"), "sifra": 142, "ime": "Zagorje ob Savi" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6422"), "sifra": 143, "ime": "Zavrč" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6423"), "sifra": 144, "ime": "Zreče" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6424"), "sifra": 190, "ime": "Žalec" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6425"), "sifra": 146, "ime": "Železniki" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6426"), "sifra": 191, "ime": "Žetale" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6427"), "sifra": 147, "ime": "Žiri" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6428"), "sifra": 192, "ime": "Žirovnica" },
{ "_id": ObjectId("5ac3ac7ccaf7bd0bdada6429"), "sifra": 193, "ime": "Žužemberk" }
    ],
    drzave: [
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4e7"), "dvomestna_koda": "AF", "trimestna_koda": "AFG", "numericna_oznaka": 4, "ISO_naziv": "Afghanistan", "slovenski_naziv": "Afganistan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4e8"), "dvomestna_koda": "AX", "trimestna_koda": "ALA", "numericna_oznaka": 248, "ISO_naziv": "Ålland Islands", "slovenski_naziv": "Alandski otoki", "opomba": "Otočje v Baltiku." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4e9"), "dvomestna_koda": "AL", "trimestna_koda": "ALB", "numericna_oznaka": 8, "ISO_naziv": "Albania", "slovenski_naziv": "Albanija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4ea"), "dvomestna_koda": "DZ", "trimestna_koda": "DZA", "numericna_oznaka": 10, "ISO_naziv": "Algeria", "slovenski_naziv": "Alžirija", "opomba": "Koda po kabilskem nazivu: Dzayer." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4eb"), "dvomestna_koda": "AS", "trimestna_koda": "ASM", "numericna_oznaka": 14, "ISO_naziv": "American Samoa", "slovenski_naziv": "Ameriška Samoa", "opomba": "Zunanji teritorij ZDA v južnem Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4ec"), "dvomestna_koda": "AD", "trimestna_koda": "AND", "numericna_oznaka": 16, "ISO_naziv": "Andorra", "slovenski_naziv": "Andora", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4ed"), "dvomestna_koda": "AO", "trimestna_koda": "AGO", "numericna_oznaka": 20, "ISO_naziv": "Angola", "slovenski_naziv": "Angola", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4ee"), "dvomestna_koda": "AI", "trimestna_koda": "AIA", "numericna_oznaka": 660, "ISO_naziv": "Anguilla", "slovenski_naziv": "Angvila", "opomba": "Čezmorska skupnost Velike Britanije, predhodno je AI predstavljal francoski: Afar and Issas." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4ef"), "dvomestna_koda": "AQ", "trimestna_koda": "ATA", "numericna_oznaka": 8, "ISO_naziv": "Antarctica", "slovenski_naziv": "Antarktika", "opomba": "Koda pa francoskem nazivu: Antarctique." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f0"), "dvomestna_koda": "AG", "trimestna_koda": "ATG", "numericna_oznaka": 28, "ISO_naziv": "Antigua and Barbuda", "slovenski_naziv": "Antigva in Barbuda", "opomba": "Otoška država v malih Antilih v Karibskem morju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f1"), "dvomestna_koda": "AR", "trimestna_koda": "ARG", "numericna_oznaka": 26, "ISO_naziv": "Argentina", "slovenski_naziv": "Argenitna", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f2"), "dvomestna_koda": "AM", "trimestna_koda": "ARM", "numericna_oznaka": 41, "ISO_naziv": "Armenia", "slovenski_naziv": "Armenija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f3"), "dvomestna_koda": "AW", "trimestna_koda": "ABW", "numericna_oznaka": 533, "ISO_naziv": "Aruba", "slovenski_naziv": "Aruba", "opomba": "Otok v Karibskem morju, del kraljevine Nizozemske." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f4"), "dvomestna_koda": "AU", "trimestna_koda": "AUS", "numericna_oznaka": 30, "ISO_naziv": "Australia", "slovenski_naziv": "Avstralija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f5"), "dvomestna_koda": "AT", "trimestna_koda": "AUT", "numericna_oznaka": 32, "ISO_naziv": "Austria", "slovenski_naziv": "Avstrija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f6"), "dvomestna_koda": "AZ", "trimestna_koda": "AZE", "numericna_oznaka": 25, "ISO_naziv": "Azerbaijan", "slovenski_naziv": "Azerbajdžan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f7"), "dvomestna_koda": "BS", "trimestna_koda": "BHS", "numericna_oznaka": 36, "ISO_naziv": "Bahamas", "slovenski_naziv": "Bahami", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f8"), "dvomestna_koda": "BH", "trimestna_koda": "BHR", "numericna_oznaka": 48, "ISO_naziv": "Bahrain", "slovenski_naziv": "Bahrajn", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4f9"), "dvomestna_koda": "BD", "trimestna_koda": "BGD", "numericna_oznaka": 40, "ISO_naziv": "Bangladesh", "slovenski_naziv": "Bangladeš", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4fa"), "dvomestna_koda": "BB", "trimestna_koda": "BRB", "numericna_oznaka": 42, "ISO_naziv": "Barbados", "slovenski_naziv": "Barbados", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4fb"), "dvomestna_koda": "BY", "trimestna_koda": "BLR", "numericna_oznaka": 112, "ISO_naziv": "Belarus", "slovenski_naziv": "Belorusija", "opomba": "Bivši ISO naziv države: Byelorussian SSR." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4fc"), "dvomestna_koda": "BE", "trimestna_koda": "BEL", "numericna_oznaka": 46, "ISO_naziv": "Belgium", "slovenski_naziv": "Belgija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4fd"), "dvomestna_koda": "BZ", "trimestna_koda": "BLZ", "numericna_oznaka": 84, "ISO_naziv": "Belize", "slovenski_naziv": "Belize", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4fe"), "dvomestna_koda": "BJ", "trimestna_koda": "BEN", "numericna_oznaka": 204, "ISO_naziv": "Benin", "slovenski_naziv": "Benin", "opomba": "Bivši ISO naziv države: Dahomey (DY)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a4ff"), "dvomestna_koda": "BM", "trimestna_koda": "BMU", "numericna_oznaka": 48, "ISO_naziv": "Bermuda", "slovenski_naziv": "Bermudi", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a500"), "dvomestna_koda": "BT", "trimestna_koda": "BTN", "numericna_oznaka": 52, "ISO_naziv": "Bhutan", "slovenski_naziv": "Butan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a501"), "dvomestna_koda": "BO", "trimestna_koda": "BOL", "numericna_oznaka": 68, "ISO_naziv": "Bolivia, Plurinational State of", "slovenski_naziv": "Bolivija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a502"), "dvomestna_koda": "BQ", "trimestna_koda": "BES", "numericna_oznaka": 535, "ISO_naziv": "Bonaire, Sint Eustatius and Saba", "slovenski_naziv": "Otočje Bonaire, Sv. Eustatij in Saba", "opomba": "Otočje v karibih pod nizozemsko upravo (the BES Islands). Bivši ISO naziv države: Bonaire, Saint Eustatius and Saba. BQ je prej predstavljal: British Antarctic Territory." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a503"), "dvomestna_koda": "BA", "trimestna_koda": "BIH", "numericna_oznaka": 56, "ISO_naziv": "Bosnia and Herzegovina", "slovenski_naziv": "Bosna in Hercegovina", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a504"), "dvomestna_koda": "BW", "trimestna_koda": "BWA", "numericna_oznaka": 58, "ISO_naziv": "Botswana", "slovenski_naziv": "Bocvana", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a505"), "dvomestna_koda": "BV", "trimestna_koda": "BVT", "numericna_oznaka": 60, "ISO_naziv": "Bouvet Island", "slovenski_naziv": "Bouvetov otok", "opomba": "Norveški otok v južnem Atlantskem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a506"), "dvomestna_koda": "BR", "trimestna_koda": "BRA", "numericna_oznaka": 62, "ISO_naziv": "Brazil", "slovenski_naziv": "Brazilija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a507"), "dvomestna_koda": "IO", "trimestna_koda": "IOT", "numericna_oznaka": 86, "ISO_naziv": "British Indian Ocean Territory", "slovenski_naziv": "Britansko ozemlje v Indijskem oceanu", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a508"), "dvomestna_koda": "BN", "trimestna_koda": "BRN", "numericna_oznaka": 96, "ISO_naziv": "Brunei Darussalam", "slovenski_naziv": "Brunej", "opomba": "ISO naziv države po nazivu v ZN. Otoška država na otok Borneo v JV Aziji." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a509"), "dvomestna_koda": "BG", "trimestna_koda": "BGR", "numericna_oznaka": 100, "ISO_naziv": "Bulgaria", "slovenski_naziv": "Bolgarija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a50a"), "dvomestna_koda": "BF", "trimestna_koda": "BFA", "numericna_oznaka": 854, "ISO_naziv": "Burkina Faso", "slovenski_naziv": "Burkina Faso", "opomba": "Bivši ISO naziv države: Upper Volta (HV)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a50b"), "dvomestna_koda": "BI", "trimestna_koda": "BDI", "numericna_oznaka": 108, "ISO_naziv": "Burundi", "slovenski_naziv": "Burundi", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a50c"), "dvomestna_koda": "KH", "trimestna_koda": "KHM", "numericna_oznaka": 116, "ISO_naziv": "Cambodia", "slovenski_naziv": "Kambodža", "opomba": "Koda po bivšem nazivu: Khmer Republic. Bivši ISO naziv države: Kampuchea." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a50d"), "dvomestna_koda": "CM", "trimestna_koda": "CMR", "numericna_oznaka": 120, "ISO_naziv": "Cameroon", "slovenski_naziv": "Kamerun", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a50e"), "dvomestna_koda": "CA", "trimestna_koda": "CAN", "numericna_oznaka": 124, "ISO_naziv": "Canada", "slovenski_naziv": "Kanada", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a50f"), "dvomestna_koda": "CV", "trimestna_koda": "CPV", "numericna_oznaka": 132, "ISO_naziv": "Cape Verde", "slovenski_naziv": "Kapverdski otoki (Zelenortski otoki)", "opomba": "Otočje v Atlantskem oceanu ob Afriki." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a510"), "dvomestna_koda": "KY", "trimestna_koda": "CYM", "numericna_oznaka": 136, "ISO_naziv": "Cayman Islands", "slovenski_naziv": "Kajmanski otoki", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a511"), "dvomestna_koda": "CF", "trimestna_koda": "CAF", "numericna_oznaka": 140, "ISO_naziv": "Central African Republic", "slovenski_naziv": "Srednjeafriška republika", "opomba": "Prej znana kot francoska kolonija Ubangi-Shari." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a512"), "dvomestna_koda": "TD", "trimestna_koda": "TCD", "numericna_oznaka": 148, "ISO_naziv": "Chad", "slovenski_naziv": "Čad", "opomba": "Koda po francoskem nazivu: Tchad." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a513"), "dvomestna_koda": "CL", "trimestna_koda": "CHL", "numericna_oznaka": 152, "ISO_naziv": "Chile", "slovenski_naziv": "Čile", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a514"), "dvomestna_koda": "CN", "trimestna_koda": "CHN", "numericna_oznaka": 156, "ISO_naziv": "China", "slovenski_naziv": "Kitajska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a515"), "dvomestna_koda": "CX", "trimestna_koda": "CXR", "numericna_oznaka": 162, "ISO_naziv": "Christmas Island", "slovenski_naziv": "Božični otok", "opomba": "Avstralsko ozemlje v Indijskem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a516"), "dvomestna_koda": "CC", "trimestna_koda": "CCK", "numericna_oznaka": 166, "ISO_naziv": "Cocos (Keeling) Islands", "slovenski_naziv": "Kokosovi in Keelingovi otoki", "opomba": "Otočje pod upravo Avstralije v Indijskem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a517"), "dvomestna_koda": "CO", "trimestna_koda": "COL", "numericna_oznaka": 170, "ISO_naziv": "Colombia", "slovenski_naziv": "Kolumbija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a518"), "dvomestna_koda": "KM", "trimestna_koda": "COM", "numericna_oznaka": 174, "ISO_naziv": "Comoros", "slovenski_naziv": "Komori", "opomba": "Otočje v Indijskem oceanu. Koda po nazivu v komorščini: Komori." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a519"), "dvomestna_koda": "CG", "trimestna_koda": "COG", "numericna_oznaka": 178, "ISO_naziv": "Congo", "slovenski_naziv": "Kongo", "opomba": "Srednji Kongo (celinska država brez morja)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a51a"), "dvomestna_koda": "CD", "trimestna_koda": "COD", "numericna_oznaka": 180, "ISO_naziv": "Congo, the Democratic Republic of the", "slovenski_naziv": "Demokratična republika Kongo", "opomba": "Bivše ime: Zaire (ZR), obmorska država." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a51b"), "dvomestna_koda": "CK", "trimestna_koda": "COK", "numericna_oznaka": 184, "ISO_naziv": "Cook Islands", "slovenski_naziv": "Cookovi otoki", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a51c"), "dvomestna_koda": "CR", "trimestna_koda": "CRI", "numericna_oznaka": 188, "ISO_naziv": "Costa Rica", "slovenski_naziv": "Kostarika", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a51d"), "dvomestna_koda": "CI", "trimestna_koda": "CIV", "numericna_oznaka": 384, "ISO_naziv": "Côte d'Ivoire", "slovenski_naziv": "Slonokoščena obala", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a51e"), "dvomestna_koda": "HR", "trimestna_koda": "HRV", "numericna_oznaka": 191, "ISO_naziv": "Croatia", "slovenski_naziv": "Hrvaška", "opomba": "Koda po nazivu v hrvaščini: Hrvatska." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a51f"), "dvomestna_koda": "CU", "trimestna_koda": "CUB", "numericna_oznaka": 192, "ISO_naziv": "Cuba", "slovenski_naziv": "Kuba", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a520"), "dvomestna_koda": "CW", "trimestna_koda": "CUW", "numericna_oznaka": 531, "ISO_naziv": "Curaçao", "slovenski_naziv": "Kurasao", "opomba": "Spada v čezmorsko ozemlje Nizozemske, Nizozemski Antili." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a521"), "dvomestna_koda": "CY", "trimestna_koda": "CYP", "numericna_oznaka": 196, "ISO_naziv": "Cyprus", "slovenski_naziv": "Ciper", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a522"), "dvomestna_koda": "CZ", "trimestna_koda": "CZE", "numericna_oznaka": 203, "ISO_naziv": "Czech Republic", "slovenski_naziv": "Češka", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a523"), "dvomestna_koda": "DK", "trimestna_koda": "DNK", "numericna_oznaka": 208, "ISO_naziv": "Denmark", "slovenski_naziv": "Danska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a524"), "dvomestna_koda": "DJ", "trimestna_koda": "DJI", "numericna_oznaka": 262, "ISO_naziv": "Djibouti", "slovenski_naziv": "Džibuti", "opomba": "Staro ime: French Afar and Issas (AI)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a525"), "dvomestna_koda": "DM", "trimestna_koda": "DMA", "numericna_oznaka": 212, "ISO_naziv": "Dominica", "slovenski_naziv": "Dominika", "opomba": "Otoška država v malih Antilih v Karibskem morju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a526"), "dvomestna_koda": "DO", "trimestna_koda": "DOM", "numericna_oznaka": 214, "ISO_naziv": "Dominican Republic", "slovenski_naziv": "Dominikanska republika", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a527"), "dvomestna_koda": "EC", "trimestna_koda": "ECU", "numericna_oznaka": 218, "ISO_naziv": "Ecuador", "slovenski_naziv": "Ekvador", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a528"), "dvomestna_koda": "EG", "trimestna_koda": "EGY", "numericna_oznaka": 818, "ISO_naziv": "Egypt", "slovenski_naziv": "Egipt", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a529"), "dvomestna_koda": "SV", "trimestna_koda": "SLV", "numericna_oznaka": 222, "ISO_naziv": "El Salvador", "slovenski_naziv": "Salvador", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a52a"), "dvomestna_koda": "GQ", "trimestna_koda": "GNQ", "numericna_oznaka": 226, "ISO_naziv": "Equatorial Guinea", "slovenski_naziv": "Ekvatorialna Gvineja", "opomba": "Koda po francoskem nazivu: Guinée équatoriale." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a52b"), "dvomestna_koda": "ER", "trimestna_koda": "ERI", "numericna_oznaka": 232, "ISO_naziv": "Eritrea", "slovenski_naziv": "Eritreja", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a52c"), "dvomestna_koda": "EE", "trimestna_koda": "EST", "numericna_oznaka": 233, "ISO_naziv": "Estonia", "slovenski_naziv": "Estonija", "opomba": "Koda po estonskem nazivu: Eesti." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a52d"), "dvomestna_koda": "ET", "trimestna_koda": "ETH", "numericna_oznaka": 231, "ISO_naziv": "Ethiopia", "slovenski_naziv": "Etiopija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a52e"), "dvomestna_koda": "FK", "trimestna_koda": "FRO", "numericna_oznaka": 234, "ISO_naziv": "Falkland Islands (Malvinas)", "slovenski_naziv": "Falkalndski otoki", "opomba": "Čezmorsko otočje velike Britanije." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a52f"), "dvomestna_koda": "FO", "trimestna_koda": "FLK", "numericna_oznaka": 238, "ISO_naziv": "Faroe Islands", "slovenski_naziv": "Ferski otoki", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a530"), "dvomestna_koda": "FJ", "trimestna_koda": "FJI", "numericna_oznaka": 242, "ISO_naziv": "Fiji", "slovenski_naziv": "Fidži", "opomba": "Otočje v južnem Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a531"), "dvomestna_koda": "FI", "trimestna_koda": "FIN", "numericna_oznaka": 246, "ISO_naziv": "Finland", "slovenski_naziv": "Finska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a532"), "dvomestna_koda": "FR", "trimestna_koda": "FRA", "numericna_oznaka": 250, "ISO_naziv": "France", "slovenski_naziv": "Francija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a533"), "dvomestna_koda": "GF", "trimestna_koda": "GUF", "numericna_oznaka": 254, "ISO_naziv": "French Guiana", "slovenski_naziv": "Francoska Gvajana", "opomba": "Koda po francoskem nazivu: Guyane française." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a534"), "dvomestna_koda": "PF", "trimestna_koda": "PYF", "numericna_oznaka": 258, "ISO_naziv": "French Polynesia", "slovenski_naziv": "Francoska Polinezija", "opomba": "Čezmorsko otočje Francije v južnem Tihem oceanu. Koda po francoskem nazivu: Polynésie française." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a535"), "dvomestna_koda": "TF", "trimestna_koda": "ATF", "numericna_oznaka": 260, "ISO_naziv": "French Southern Territories", "slovenski_naziv": "Francoska južna ozemlja", "opomba": "Predstavlja francoske vulkanske otoke JV od Afrike v Indijskem oceanu in del antarktike, ki Franciji niso mednarodno priznani. Koda po francokem nazivu: Terres australes françaises." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a536"), "dvomestna_koda": "GA", "trimestna_koda": "GAB", "numericna_oznaka": 266, "ISO_naziv": "Gabon", "slovenski_naziv": "Gabon", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a537"), "dvomestna_koda": "GM", "trimestna_koda": "GMB", "numericna_oznaka": 270, "ISO_naziv": "Gambia", "slovenski_naziv": "Gambija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a538"), "dvomestna_koda": "GE", "trimestna_koda": "GEO", "numericna_oznaka": 268, "ISO_naziv": "Georgia", "slovenski_naziv": "Gruzija", "opomba": "Koda GE je prej predstavljala Gilbertove in Ellisijine otoke." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a539"), "dvomestna_koda": "DE", "trimestna_koda": "DEU", "numericna_oznaka": 276, "ISO_naziv": "Germany", "slovenski_naziv": "Nemčija", "opomba": "Koda po nemškem nazivu: Deutschland. Koda pred 1990 v uporabi za Zahodno Nemčijo." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a53a"), "dvomestna_koda": "GH", "trimestna_koda": "GHA", "numericna_oznaka": 288, "ISO_naziv": "Ghana", "slovenski_naziv": "Gana", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a53b"), "dvomestna_koda": "GI", "trimestna_koda": "GIB", "numericna_oznaka": 292, "ISO_naziv": "Gibraltar", "slovenski_naziv": "Gibraltar", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a53c"), "dvomestna_koda": "GR", "trimestna_koda": "GRC", "numericna_oznaka": 300, "ISO_naziv": "Greece", "slovenski_naziv": "Grčija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a53d"), "dvomestna_koda": "GL", "trimestna_koda": "GRL", "numericna_oznaka": 304, "ISO_naziv": "Greenland", "slovenski_naziv": "Grenlandija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a53e"), "dvomestna_koda": "GD", "trimestna_koda": "GRD", "numericna_oznaka": 308, "ISO_naziv": "Grenada", "slovenski_naziv": "Grenada", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a53f"), "dvomestna_koda": "GP", "trimestna_koda": "GLP", "numericna_oznaka": 312, "ISO_naziv": "Guadeloupe", "slovenski_naziv": "Guadeloupe", "opomba": "Čezmorski otok Francije v Karibskem morju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a540"), "dvomestna_koda": "GU", "trimestna_koda": "GUM", "numericna_oznaka": 316, "ISO_naziv": "Guam", "slovenski_naziv": "Guam", "opomba": "Zunanji teritorij ZDA v Tihem oceanu (tudi Guahan)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a541"), "dvomestna_koda": "GT", "trimestna_koda": "GTM", "numericna_oznaka": 320, "ISO_naziv": "Guatemala", "slovenski_naziv": "Gvatemala", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a542"), "dvomestna_koda": "GG", "trimestna_koda": "GGY", "numericna_oznaka": 831, "ISO_naziv": "Guernsey", "slovenski_naziv": "Otok Guernsey", "opomba": "Bailwick of Goursey je Britanski otok ob Franciji." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a543"), "dvomestna_koda": "GN", "trimestna_koda": "GIN", "numericna_oznaka": 324, "ISO_naziv": "Guinea", "slovenski_naziv": "Gvineja", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a544"), "dvomestna_koda": "GW", "trimestna_koda": "GNB", "numericna_oznaka": 624, "ISO_naziv": "Guinea-Bissau", "slovenski_naziv": "Gvineja-Bissau", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a545"), "dvomestna_koda": "GY", "trimestna_koda": "GUY", "numericna_oznaka": 328, "ISO_naziv": "Guyana", "slovenski_naziv": "Gvajana", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a546"), "dvomestna_koda": "HT", "trimestna_koda": "HTI", "numericna_oznaka": 332, "ISO_naziv": "Haiti", "slovenski_naziv": "Haiti", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a547"), "dvomestna_koda": "HM", "trimestna_koda": "HMD", "numericna_oznaka": 334, "ISO_naziv": "Heard Island and McDonald Islands", "slovenski_naziv": "Otok Heard in otočje McDonald", "opomba": "Nenaseljeno otočje v Indijskem oceanu pod upravo Avstralije." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a548"), "dvomestna_koda": "VA", "trimestna_koda": "VAT", "numericna_oznaka": 336, "ISO_naziv": "Holy See (Vatican City State)", "slovenski_naziv": "Vatikan", "opomba": "Bivši ISO naziv države: Vatican City State (Vatikanska mestna država)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a549"), "dvomestna_koda": "HN", "trimestna_koda": "HND", "numericna_oznaka": 340, "ISO_naziv": "Honduras", "slovenski_naziv": "Honduras", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a54a"), "dvomestna_koda": "HK", "trimestna_koda": "HKG", "numericna_oznaka": 344, "ISO_naziv": "Hong Kong", "slovenski_naziv": "Hong Kong", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a54b"), "dvomestna_koda": "HU", "trimestna_koda": "HUN", "numericna_oznaka": 348, "ISO_naziv": "Hungary", "slovenski_naziv": "Madžarska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a54c"), "dvomestna_koda": "IS", "trimestna_koda": "ISL", "numericna_oznaka": 352, "ISO_naziv": "Iceland", "slovenski_naziv": "Islandija", "opomba": "Koda po nazivu v islandščini: Ísland." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a54d"), "dvomestna_koda": "IN", "trimestna_koda": "IND", "numericna_oznaka": 356, "ISO_naziv": "India", "slovenski_naziv": "Indija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a54e"), "dvomestna_koda": "ID", "trimestna_koda": "IDN", "numericna_oznaka": 360, "ISO_naziv": "Indonesia", "slovenski_naziv": "Indonezija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a54f"), "dvomestna_koda": "IR", "trimestna_koda": "IRN", "numericna_oznaka": 364, "ISO_naziv": "Iran, Islamic Republic of", "slovenski_naziv": "Iran", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a550"), "dvomestna_koda": "IQ", "trimestna_koda": "IRQ", "numericna_oznaka": 368, "ISO_naziv": "Iraq", "slovenski_naziv": "Irak", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a551"), "dvomestna_koda": "IE", "trimestna_koda": "IRL", "numericna_oznaka": 372, "ISO_naziv": "Ireland", "slovenski_naziv": "Irska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a552"), "dvomestna_koda": "IM", "trimestna_koda": "IMN", "numericna_oznaka": 833, "ISO_naziv": "Isle of Man", "slovenski_naziv": "Otok Man", "opomba": "Spada neposredno pod Britansko krono a ni del Velike Britanije, nahaja se med Irsko in Veliko Britanijo." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a553"), "dvomestna_koda": "IL", "trimestna_koda": "ISR", "numericna_oznaka": 376, "ISO_naziv": "Israel", "slovenski_naziv": "Izrael", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a554"), "dvomestna_koda": "IT", "trimestna_koda": "ITA", "numericna_oznaka": 380, "ISO_naziv": "Italy", "slovenski_naziv": "Italija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a555"), "dvomestna_koda": "JM", "trimestna_koda": "JAM", "numericna_oznaka": 388, "ISO_naziv": "Jamaica", "slovenski_naziv": "Jamajka", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a556"), "dvomestna_koda": "JP", "trimestna_koda": "JPN", "numericna_oznaka": 392, "ISO_naziv": "Japan", "slovenski_naziv": "Japonska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a557"), "dvomestna_koda": "JE", "trimestna_koda": "JEY", "numericna_oznaka": 832, "ISO_naziv": "Jersey", "slovenski_naziv": "Otok Jersey", "opomba": "Bailwick of Jersey je Britanski otok med Anglijo in Francijo." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a558"), "dvomestna_koda": "JO", "trimestna_koda": "JOR", "numericna_oznaka": 400, "ISO_naziv": "Jordan", "slovenski_naziv": "Jordanija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a559"), "dvomestna_koda": "KZ", "trimestna_koda": "KAZ", "numericna_oznaka": 398, "ISO_naziv": "Kazakhstan", "slovenski_naziv": "Kazahstan", "opomba": "Bivši ISO naziv države: Kazakstan." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a55a"), "dvomestna_koda": "KE", "trimestna_koda": "KEN", "numericna_oznaka": 404, "ISO_naziv": "Kenya", "slovenski_naziv": "Kenija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a55b"), "dvomestna_koda": "KI", "trimestna_koda": "KIR", "numericna_oznaka": 296, "ISO_naziv": "Kiribati", "slovenski_naziv": "Kiribati", "opomba": "Razpršeno otočje v Tihem oceanu. Stari naziv: Gilbertovi otoki." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a55c"), "dvomestna_koda": "KP", "trimestna_koda": "PRK", "numericna_oznaka": 408, "ISO_naziv": "Korea, Democratic People's Republic of", "slovenski_naziv": "Severna Koreja", "opomba": "ISO naziv države po uradnem nazivu v ZN (splošno ime: Severna Koreja)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a55d"), "dvomestna_koda": "KR", "trimestna_koda": "KOR", "numericna_oznaka": 410, "ISO_naziv": "Korea, Republic of", "slovenski_naziv": "Južna Koreja", "opomba": "ISO naziv države po uradnem nazivu v ZN (splošno ime: Južna Koreja)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a55e"), "dvomestna_koda": "KW", "trimestna_koda": "KWT", "numericna_oznaka": 414, "ISO_naziv": "Kuwait", "slovenski_naziv": "Kuvajt", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a55f"), "dvomestna_koda": "KG", "trimestna_koda": "KGZ", "numericna_oznaka": 417, "ISO_naziv": "Kyrgyzstan", "slovenski_naziv": "Kirgizistan (Kirgizija)", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a560"), "dvomestna_koda": "LA", "trimestna_koda": "LAO", "numericna_oznaka": 418, "ISO_naziv": "Lao People's Democratic Republic", "slovenski_naziv": "Laos", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a561"), "dvomestna_koda": "LV", "trimestna_koda": "LVA", "numericna_oznaka": 428, "ISO_naziv": "Latvia", "slovenski_naziv": "Latvija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a562"), "dvomestna_koda": "LB", "trimestna_koda": "LBN", "numericna_oznaka": 422, "ISO_naziv": "Lebanon", "slovenski_naziv": "Libanon", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a563"), "dvomestna_koda": "LS", "trimestna_koda": "LSO", "numericna_oznaka": 426, "ISO_naziv": "Lesotho", "slovenski_naziv": "Lesoto", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a564"), "dvomestna_koda": "LR", "trimestna_koda": "LBR", "numericna_oznaka": 430, "ISO_naziv": "Liberia", "slovenski_naziv": "Liberija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a565"), "dvomestna_koda": "LY", "trimestna_koda": "LBY", "numericna_oznaka": 434, "ISO_naziv": "Libya", "slovenski_naziv": "Libija", "opomba": "Bivši ISO naziv države: Libyan Arab Jamahiriya." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a566"), "dvomestna_koda": "LI", "trimestna_koda": "LIE", "numericna_oznaka": 438, "ISO_naziv": "Liechtenstein", "slovenski_naziv": "Lihtenštajn", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a567"), "dvomestna_koda": "LT", "trimestna_koda": "LTU", "numericna_oznaka": 440, "ISO_naziv": "Lithuania", "slovenski_naziv": "Litva", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a568"), "dvomestna_koda": "LU", "trimestna_koda": "LUX", "numericna_oznaka": 442, "ISO_naziv": "Luxembourg", "slovenski_naziv": "Luksemburg", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a569"), "dvomestna_koda": "MO", "trimestna_koda": "MAC", "numericna_oznaka": 446, "ISO_naziv": "Macao", "slovenski_naziv": "Makao", "opomba": "Bivši ISO naziv države: Macau." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a56a"), "dvomestna_koda": "MK", "trimestna_koda": "MKD", "numericna_oznaka": 807, "ISO_naziv": "Macedonia, the former Yugoslav Republic of", "slovenski_naziv": "Makedonija", "opomba": "ISO naziv države glede na spor o nazivu države. Uradno domače ime države: Republika Makedonija." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a56b"), "dvomestna_koda": "MG", "trimestna_koda": "MDG", "numericna_oznaka": 450, "ISO_naziv": "Madagascar", "slovenski_naziv": "Madagaskar", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a56c"), "dvomestna_koda": "MW", "trimestna_koda": "MWI", "numericna_oznaka": 454, "ISO_naziv": "Malawi", "slovenski_naziv": "Malavi", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a56d"), "dvomestna_koda": "MY", "trimestna_koda": "MYS", "numericna_oznaka": 458, "ISO_naziv": "Malaysia", "slovenski_naziv": "Malezija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a56e"), "dvomestna_koda": "MV", "trimestna_koda": "MDV", "numericna_oznaka": 462, "ISO_naziv": "Maldives", "slovenski_naziv": "Maldivi", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a56f"), "dvomestna_koda": "ML", "trimestna_koda": "MLI", "numericna_oznaka": 466, "ISO_naziv": "Mali", "slovenski_naziv": "Mali", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a570"), "dvomestna_koda": "MT", "trimestna_koda": "MLT", "numericna_oznaka": 470, "ISO_naziv": "Malta", "slovenski_naziv": "Malta", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a571"), "dvomestna_koda": "MH", "trimestna_koda": "MHL", "numericna_oznaka": 584, "ISO_naziv": "Marshall Islands", "slovenski_naziv": "Maršalovi otoki", "opomba": "Majhno otočje v Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a572"), "dvomestna_koda": "MQ", "trimestna_koda": "MTQ", "numericna_oznaka": 474, "ISO_naziv": "Martinique", "slovenski_naziv": "Martinik", "opomba": "Čezmorski otok Francije v malih Antilih v Karibsekm morju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a573"), "dvomestna_koda": "MR", "trimestna_koda": "MRT", "numericna_oznaka": 478, "ISO_naziv": "Mauritania", "slovenski_naziv": "Mavretanija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a574"), "dvomestna_koda": "MU", "trimestna_koda": "MUS", "numericna_oznaka": 480, "ISO_naziv": "Mauritius", "slovenski_naziv": "Mauricius (Moris)", "opomba": "Domačini v kreolščini imenujejo otok: Moris." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a575"), "dvomestna_koda": "YT", "trimestna_koda": "MYT", "numericna_oznaka": 175, "ISO_naziv": "Mayotte", "slovenski_naziv": "Francoska skupnost Mejot", "opomba": "Čezmorska skupnost Francije ob vzhodni obali Afrike." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a576"), "dvomestna_koda": "MX", "trimestna_koda": "MEX", "numericna_oznaka": 484, "ISO_naziv": "Mexico", "slovenski_naziv": "Mehika", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a577"), "dvomestna_koda": "FM", "trimestna_koda": "FSM", "numericna_oznaka": 583, "ISO_naziv": "Micronesia, Federated States of", "slovenski_naziv": "Mikronezija", "opomba": "Bivši ISO naziv države: Micronesia. Nahaja se v Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a578"), "dvomestna_koda": "MD", "trimestna_koda": "MDA", "numericna_oznaka": 498, "ISO_naziv": "Moldova, Republic of", "slovenski_naziv": "Moldavija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a579"), "dvomestna_koda": "MC", "trimestna_koda": "MCO", "numericna_oznaka": 492, "ISO_naziv": "Monaco", "slovenski_naziv": "Monako", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a57a"), "dvomestna_koda": "MN", "trimestna_koda": "MNG", "numericna_oznaka": 496, "ISO_naziv": "Mongolia", "slovenski_naziv": "Mongolija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a57b"), "dvomestna_koda": "ME", "trimestna_koda": "MNE", "numericna_oznaka": 499, "ISO_naziv": "Montenegro", "slovenski_naziv": "Črna Gora", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a57c"), "dvomestna_koda": "MS", "trimestna_koda": "MSR", "numericna_oznaka": 500, "ISO_naziv": "Montserrat", "slovenski_naziv": "Montserat", "opomba": "Otok v Antilih v Karibskem morju odvisen od Velike Britanije." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a57d"), "dvomestna_koda": "MA", "trimestna_koda": "MAR", "numericna_oznaka": 504, "ISO_naziv": "Morocco", "slovenski_naziv": "Maroko", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a57e"), "dvomestna_koda": "MZ", "trimestna_koda": "MOZ", "numericna_oznaka": 508, "ISO_naziv": "Mozambique", "slovenski_naziv": "Mozambik", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a57f"), "dvomestna_koda": "MM", "trimestna_koda": "MMR", "numericna_oznaka": 104, "ISO_naziv": "Myanmar", "slovenski_naziv": "Mjanmar", "opomba": "Bivši naziv: Burma (BU)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a580"), "dvomestna_koda": "NA", "trimestna_koda": "NAM", "numericna_oznaka": 516, "ISO_naziv": "Namibia", "slovenski_naziv": "Namibija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a581"), "dvomestna_koda": "NR", "trimestna_koda": "NRU", "numericna_oznaka": 520, "ISO_naziv": "Nauru", "slovenski_naziv": "Nauru", "opomba": "Otoška država v Južnem Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a582"), "dvomestna_koda": "NP", "trimestna_koda": "NPL", "numericna_oznaka": 524, "ISO_naziv": "Nepal", "slovenski_naziv": "Nepal", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a583"), "dvomestna_koda": "NL", "trimestna_koda": "NLD", "numericna_oznaka": 528, "ISO_naziv": "Netherlands", "slovenski_naziv": "Nizozemska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a584"), "dvomestna_koda": "NC", "trimestna_koda": "NCL", "numericna_oznaka": 540, "ISO_naziv": "New Caledonia", "slovenski_naziv": "Nova Kaledonija", "opomba": "Čezmorsko otočje Francije v Pacifiku." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a585"), "dvomestna_koda": "NZ", "trimestna_koda": "NZL", "numericna_oznaka": 554, "ISO_naziv": "New Zealand", "slovenski_naziv": "Nova Zelandija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a586"), "dvomestna_koda": "NI", "trimestna_koda": "NIC", "numericna_oznaka": 558, "ISO_naziv": "Nicaragua", "slovenski_naziv": "Nikaragva", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a587"), "dvomestna_koda": "NE", "trimestna_koda": "NER", "numericna_oznaka": 562, "ISO_naziv": "Niger", "slovenski_naziv": "Niger", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a588"), "dvomestna_koda": "NG", "trimestna_koda": "NGA", "numericna_oznaka": 566, "ISO_naziv": "Nigeria", "slovenski_naziv": "Nigerija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a589"), "dvomestna_koda": "NU", "trimestna_koda": "NIU", "numericna_oznaka": 570, "ISO_naziv": "Niue", "slovenski_naziv": "Niu", "opomba": "Otoška država v Južnem Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a58a"), "dvomestna_koda": "NF", "trimestna_koda": "NFK", "numericna_oznaka": 574, "ISO_naziv": "Norfolk Island", "slovenski_naziv": "Otok Norflok", "opomba": "Del Avstralije s samoupravo." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a58b"), "dvomestna_koda": "MP", "trimestna_koda": "MNP", "numericna_oznaka": 580, "ISO_naziv": "Northern Mariana Islands", "slovenski_naziv": "Severni Marianski otoki", "opomba": "Ameriško otočje v severnem Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a58c"), "dvomestna_koda": "NO", "trimestna_koda": "NOR", "numericna_oznaka": 578, "ISO_naziv": "Norway", "slovenski_naziv": "Norveška", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a58d"), "dvomestna_koda": "OM", "trimestna_koda": "OMN", "numericna_oznaka": 512, "ISO_naziv": "Oman", "slovenski_naziv": "Oman", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a58e"), "dvomestna_koda": "PK", "trimestna_koda": "PAK", "numericna_oznaka": 586, "ISO_naziv": "Pakistan", "slovenski_naziv": "Pakistan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a58f"), "dvomestna_koda": "PW", "trimestna_koda": "PLW", "numericna_oznaka": 585, "ISO_naziv": "Palau", "slovenski_naziv": "Palau", "opomba": "Majhna otoška država v Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a590"), "dvomestna_koda": "PS", "trimestna_koda": "PSE", "numericna_oznaka": 275, "ISO_naziv": "Palestinian Territory, Occupied", "slovenski_naziv": "Palestina", "opomba": "Sestavljena iz Zahodnega brega in Gaze." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a591"), "dvomestna_koda": "PA", "trimestna_koda": "PAN", "numericna_oznaka": 591, "ISO_naziv": "Panama", "slovenski_naziv": "Panama", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a592"), "dvomestna_koda": "PG", "trimestna_koda": "PNG", "numericna_oznaka": 598, "ISO_naziv": "Papua New Guinea", "slovenski_naziv": "Papua Nova Gvineja", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a593"), "dvomestna_koda": "PY", "trimestna_koda": "PRY", "numericna_oznaka": 600, "ISO_naziv": "Paraguay", "slovenski_naziv": "Paragvaj", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a594"), "dvomestna_koda": "PE", "trimestna_koda": "PER", "numericna_oznaka": 604, "ISO_naziv": "Peru", "slovenski_naziv": "Peru", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a595"), "dvomestna_koda": "PH", "trimestna_koda": "PHL", "numericna_oznaka": 608, "ISO_naziv": "Philippines", "slovenski_naziv": "Filipini", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a596"), "dvomestna_koda": "PN", "trimestna_koda": "PCN", "numericna_oznaka": 612, "ISO_naziv": "Pitcairn", "slovenski_naziv": "Pitcairnovi otoki", "opomba": "Čezmorsko otočje Velike Britanije v Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a597"), "dvomestna_koda": "PL", "trimestna_koda": "POL", "numericna_oznaka": 616, "ISO_naziv": "Poland", "slovenski_naziv": "Poljska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a598"), "dvomestna_koda": "PT", "trimestna_koda": "PRT", "numericna_oznaka": 620, "ISO_naziv": "Portugal", "slovenski_naziv": "Portugalska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a599"), "dvomestna_koda": "PR", "trimestna_koda": "PRI", "numericna_oznaka": 630, "ISO_naziv": "Puerto Rico", "slovenski_naziv": "Portoriko", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a59a"), "dvomestna_koda": "QA", "trimestna_koda": "QAT", "numericna_oznaka": 634, "ISO_naziv": "Qatar", "slovenski_naziv": "Katar", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a59b"), "dvomestna_koda": "RE", "trimestna_koda": "REU", "numericna_oznaka": 638, "ISO_naziv": "Réunion", "slovenski_naziv": "Francoska skupnost Reunion", "opomba": "Čezmorska otoška skupnost Francije v Indijskem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a59c"), "dvomestna_koda": "RO", "trimestna_koda": "ROU", "numericna_oznaka": 642, "ISO_naziv": "Romania", "slovenski_naziv": "Romunija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a59d"), "dvomestna_koda": "RU", "trimestna_koda": "RUS", "numericna_oznaka": 643, "ISO_naziv": "Russian Federation", "slovenski_naziv": "Ruska federacija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a59e"), "dvomestna_koda": "RW", "trimestna_koda": "RWA", "numericna_oznaka": 646, "ISO_naziv": "Rwanda", "slovenski_naziv": "Ruanda", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a59f"), "dvomestna_koda": "BL", "trimestna_koda": "BLM", "numericna_oznaka": 652, "ISO_naziv": "Saint Barthélemy", "slovenski_naziv": "Sveti Bartolomej", "opomba": "Čezmosrksa skupnost Francije." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a0"), "dvomestna_koda": "SH", "trimestna_koda": "SHN", "numericna_oznaka": 654, "ISO_naziv": "Saint Helena, Ascension and Tristan da Cunha", "slovenski_naziv": "Sveta Helena", "opomba": "Čezmorsko ozemlje Sveta Helena Velike Britanije v Atlantskem oceanu. Bivši ISO naziv države: Saint Helena." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a1"), "dvomestna_koda": "KN", "trimestna_koda": "KNA", "numericna_oznaka": 659, "ISO_naziv": "Saint Kitts and Nevis", "slovenski_naziv": "Sveti Kits in Nevis", "opomba": "Otoška državica v karibskih Malih Antilih. Bivši ISO naziv države: Saint Kitts-Nevis-Anguilla." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a2"), "dvomestna_koda": "LC", "trimestna_koda": "LCA", "numericna_oznaka": 662, "ISO_naziv": "Saint Lucia", "slovenski_naziv": "Sveta Lucija", "opomba": "Otoška država v južnem Karibskem morju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a3"), "dvomestna_koda": "MF", "trimestna_koda": "MAF", "numericna_oznaka": 663, "ISO_naziv": "Saint Martin (French part)", "slovenski_naziv": "Otok svetega Martina", "opomba": "Čezmorsko otočje Francije v Karibskem morju. Nizozmski del otoka Sv. Martina ima kodo SX." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a4"), "dvomestna_koda": "PM", "trimestna_koda": "SPM", "numericna_oznaka": 666, "ISO_naziv": "Saint Pierre and Miquelon", "slovenski_naziv": "Sveta Pierre in Miquelon", "opomba": "Čezmorsko otočje Francije ob Kanadi in Grenlandiji." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a5"), "dvomestna_koda": "VC", "trimestna_koda": "VCT", "numericna_oznaka": 670, "ISO_naziv": "Saint Vincent and the Grenadines", "slovenski_naziv": "Sveti Vincent in Grenadini", "opomba": "Majhna otoška država v Karibskem otočju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a6"), "dvomestna_koda": "WS", "trimestna_koda": "WSM", "numericna_oznaka": 882, "ISO_naziv": "Samoa", "slovenski_naziv": "Samoa", "opomba": "Koda nastala po bivšem nazivu: Western Samoa (Zahodna Samoa)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a7"), "dvomestna_koda": "SM", "trimestna_koda": "SMR", "numericna_oznaka": 674, "ISO_naziv": "San Marino", "slovenski_naziv": "San Marino", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a8"), "dvomestna_koda": "ST", "trimestna_koda": "STP", "numericna_oznaka": 678, "ISO_naziv": "Sao Tome and Principe", "slovenski_naziv": "Sao Tome in Principe", "opomba": "Majhna otoška država v Gvinejskem zalivu ob Afriki." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5a9"), "dvomestna_koda": "SA", "trimestna_koda": "SAU", "numericna_oznaka": 682, "ISO_naziv": "Saudi Arabia", "slovenski_naziv": "Savdska Arabija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5aa"), "dvomestna_koda": "SN", "trimestna_koda": "SEN", "numericna_oznaka": 686, "ISO_naziv": "Senegal", "slovenski_naziv": "Senegal", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5ab"), "dvomestna_koda": "RS", "trimestna_koda": "SRB", "numericna_oznaka": 688, "ISO_naziv": "Serbia", "slovenski_naziv": "Srbija", "opomba": "Koda po uradnem nazivu: Republika Srbija." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5ac"), "dvomestna_koda": "SC", "trimestna_koda": "SYC", "numericna_oznaka": 690, "ISO_naziv": "Seychelles", "slovenski_naziv": "Sejšeli", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5ad"), "dvomestna_koda": "SL", "trimestna_koda": "SLE", "numericna_oznaka": 694, "ISO_naziv": "Sierra Leone", "slovenski_naziv": "Siera Leone", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5ae"), "dvomestna_koda": "SG", "trimestna_koda": "SGP", "numericna_oznaka": 702, "ISO_naziv": "Singapore", "slovenski_naziv": "Singapur", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5af"), "dvomestna_koda": "SX", "trimestna_koda": "SXM", "numericna_oznaka": 534, "ISO_naziv": "Sint Maarten (Dutch part)", "slovenski_naziv": "Otok svetega.Martina (Nizozemska)", "opomba": "Francoski del otoka Sv. Martina ima ISO kodo MF. Nahaja se v Karibskem morju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b0"), "dvomestna_koda": "SK", "trimestna_koda": "SVK", "numericna_oznaka": 703, "ISO_naziv": "Slovakia", "slovenski_naziv": "Slovaška", "opomba": "SK je prej predstavljal: Sikkim." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "dvomestna_koda": "SI", "trimestna_koda": "SVN", "numericna_oznaka": 705, "ISO_naziv": "Slovenia", "slovenski_naziv": "Slovenija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b2"), "dvomestna_koda": "SB", "trimestna_koda": "SLB", "numericna_oznaka": 90, "ISO_naziv": "Solomon Islands", "slovenski_naziv": "Solomonovi otoki", "opomba": "Koda izhaja iz starega naziva: British Solomon Islands." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b3"), "dvomestna_koda": "SO", "trimestna_koda": "SOM", "numericna_oznaka": 706, "ISO_naziv": "Somalia", "slovenski_naziv": "Somalija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b4"), "dvomestna_koda": "ZA", "trimestna_koda": "ZAF", "numericna_oznaka": 710, "ISO_naziv": "South Africa", "slovenski_naziv": "Južna afrika", "opomba": "Koda iz naziva v nizozemščini: Zuid-Afrika." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b5"), "dvomestna_koda": "GS", "trimestna_koda": "SGS", "numericna_oznaka": 239, "ISO_naziv": "South Georgia and the South Sandwich Islands", "slovenski_naziv": "Južna Georgia in Južni Sandwichevi otoki", "opomba": "Čezmorsko otočje Velike Britanije na jugu Atlantskega oceana." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b6"), "dvomestna_koda": "SS", "trimestna_koda": "SSD", "numericna_oznaka": 728, "ISO_naziv": "South Sudan", "slovenski_naziv": "Južni Sudan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b7"), "dvomestna_koda": "ES", "trimestna_koda": "ESP", "numericna_oznaka": 724, "ISO_naziv": "Spain", "slovenski_naziv": "Španija", "opomba": "Koda po nazivu v spanščini: España." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b8"), "dvomestna_koda": "LK", "trimestna_koda": "LKA", "numericna_oznaka": 144, "ISO_naziv": "Sri Lanka", "slovenski_naziv": "Šri Lanka", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5b9"), "dvomestna_koda": "SD", "trimestna_koda": "SDN", "numericna_oznaka": 729, "ISO_naziv": "Sudan", "slovenski_naziv": "Sudan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5ba"), "dvomestna_koda": "SR", "trimestna_koda": "SUR", "numericna_oznaka": 740, "ISO_naziv": "Suriname", "slovenski_naziv": "Surinam", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5bb"), "dvomestna_koda": "SJ", "trimestna_koda": "SJM", "numericna_oznaka": 744, "ISO_naziv": "Svalbard and Jan Mayen", "slovenski_naziv": "Svalbard in Jan Majen", "opomba": "Sestavljata ga dva arktična ozemlja pod suverenostjo Norveške: Svalbardski otoki in otok Jan Mayen." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5bc"), "dvomestna_koda": "SZ", "trimestna_koda": "SWZ", "numericna_oznaka": 748, "ISO_naziv": "Swaziland", "slovenski_naziv": "Svazi", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5bd"), "dvomestna_koda": "SE", "trimestna_koda": "SWE", "numericna_oznaka": 752, "ISO_naziv": "Sweden", "slovenski_naziv": "Švedska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5be"), "dvomestna_koda": "CH", "trimestna_koda": "CHE", "numericna_oznaka": 756, "ISO_naziv": "Switzerland", "slovenski_naziv": "Švica", "opomba": "Koda je narejena po nazivu v latinščini: Confoederatio Helvetica." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5bf"), "dvomestna_koda": "SY", "trimestna_koda": "SYR", "numericna_oznaka": 760, "ISO_naziv": "Syrian Arab Republic", "slovenski_naziv": "Sirija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c0"), "dvomestna_koda": "TW", "trimestna_koda": "TWN", "numericna_oznaka": 158, "ISO_naziv": "Taiwan, Province of China", "slovenski_naziv": "Tajvan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c1"), "dvomestna_koda": "TJ", "trimestna_koda": "TJK", "numericna_oznaka": 762, "ISO_naziv": "Tajikistan", "slovenski_naziv": "Tadžikistan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c2"), "dvomestna_koda": "TZ", "trimestna_koda": "TZA", "numericna_oznaka": 834, "ISO_naziv": "Tanzania, United Republic of", "slovenski_naziv": "Tanzanija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c3"), "dvomestna_koda": "TH", "trimestna_koda": "THA", "numericna_oznaka": 764, "ISO_naziv": "Thailand", "slovenski_naziv": "Tajska", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c4"), "dvomestna_koda": "TL", "trimestna_koda": "TLS", "numericna_oznaka": 626, "ISO_naziv": "Timor-Leste", "slovenski_naziv": "Vzhodni Timor", "opomba": "Bivši naziv: East Timor (TP). Majhna otoška država v JV Aziji." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c5"), "dvomestna_koda": "TG", "trimestna_koda": "TGO", "numericna_oznaka": 768, "ISO_naziv": "Togo", "slovenski_naziv": "Togo", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c6"), "dvomestna_koda": "TK", "trimestna_koda": "TKL", "numericna_oznaka": 772, "ISO_naziv": "Tokelau", "slovenski_naziv": "Tokelau", "opomba": "Trije koralni otoki pod upravo Nove Zelandije." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c7"), "dvomestna_koda": "TO", "trimestna_koda": "TON", "numericna_oznaka": 776, "ISO_naziv": "Tonga", "slovenski_naziv": "Tonga", "opomba": "Majhna otoška država v Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c8"), "dvomestna_koda": "TT", "trimestna_koda": "TTO", "numericna_oznaka": 780, "ISO_naziv": "Trinidad and Tobago", "slovenski_naziv": "Trinidad in Tobago", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5c9"), "dvomestna_koda": "TN", "trimestna_koda": "TUN", "numericna_oznaka": 788, "ISO_naziv": "Tunisia", "slovenski_naziv": "Tunizija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5ca"), "dvomestna_koda": "TR", "trimestna_koda": "TUR", "numericna_oznaka": 792, "ISO_naziv": "Turkey", "slovenski_naziv": "Turčija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5cb"), "dvomestna_koda": "TM", "trimestna_koda": "TKM", "numericna_oznaka": 795, "ISO_naziv": "Turkmenistan", "slovenski_naziv": "Turkmenistan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5cc"), "dvomestna_koda": "TC", "trimestna_koda": "TCA", "numericna_oznaka": 796, "ISO_naziv": "Turks and Caicos Islands", "slovenski_naziv": "Tirški in Kajkoški otoki", "opomba": "Čezmorska skupnost Velike Britanije v Karibskem morju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5cd"), "dvomestna_koda": "TV", "trimestna_koda": "TUV", "numericna_oznaka": 798, "ISO_naziv": "Tuvalu", "slovenski_naziv": "Tuvalu", "opomba": "Majhna otoška država v Tihem oceanu." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5ce"), "dvomestna_koda": "UG", "trimestna_koda": "UGA", "numericna_oznaka": 800, "ISO_naziv": "Uganda", "slovenski_naziv": "Uganda", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5cf"), "dvomestna_koda": "UA", "trimestna_koda": "UKR", "numericna_oznaka": 804, "ISO_naziv": "Ukraine", "slovenski_naziv": "Ukrajina", "opomba": "Bivši ISO naziv države: Ukrainian SSR." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d0"), "dvomestna_koda": "AE", "trimestna_koda": "ARE", "numericna_oznaka": 784, "ISO_naziv": "United Arab Emirates", "slovenski_naziv": "Združeni Arabski Emirati", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d1"), "dvomestna_koda": "GB", "trimestna_koda": "GBR", "numericna_oznaka": 826, "ISO_naziv": "United Kingdom", "slovenski_naziv": "Velika Britanija", "opomba": "Koda po nazivu: Great Britain (iz uradnega naziva: United Kingdom of Great Britain and Northern Ireland)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d2"), "dvomestna_koda": "US", "trimestna_koda": "USA", "numericna_oznaka": 840, "ISO_naziv": "United States", "slovenski_naziv": "Združene države Amerike", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d3"), "dvomestna_koda": "UM", "trimestna_koda": "UMI", "numericna_oznaka": 581, "ISO_naziv": "United States Minor Outlying Islands", "slovenski_naziv": "ZDA zunanji otoki", "opomba": "Sestavljeno iz devetih manjših otokov ZDA: Baker Island, Howland Island, Jarvis Island, Johnston Atoll, Kingman Reef, Midway Islands, Navassa Island, Palmyra Atoll, and Wake Island." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d4"), "dvomestna_koda": "UY", "trimestna_koda": "URY", "numericna_oznaka": 858, "ISO_naziv": "Uruguay", "slovenski_naziv": "Urugvaj", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d5"), "dvomestna_koda": "UZ", "trimestna_koda": "UZB", "numericna_oznaka": 860, "ISO_naziv": "Uzbekistan", "slovenski_naziv": "Uzbekistan", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d6"), "dvomestna_koda": "VU", "trimestna_koda": "VUT", "numericna_oznaka": 548, "ISO_naziv": "Vanuatu", "slovenski_naziv": "Republika Vanuatu", "opomba": "Stari naziv: New Hebrides (NH)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d7"), "dvomestna_koda": "VE", "trimestna_koda": "VEN", "numericna_oznaka": 862, "ISO_naziv": "Venezuela, Bolivarian Republic of", "slovenski_naziv": "Venezuela", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d8"), "dvomestna_koda": "VN", "trimestna_koda": "VNM", "numericna_oznaka": 704, "ISO_naziv": "Viet Nam", "slovenski_naziv": "Vietnam", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5d9"), "dvomestna_koda": "VG", "trimestna_koda": "VGB", "numericna_oznaka": 92, "ISO_naziv": "Virgin Islands, British", "slovenski_naziv": "Britanski Deviški otoki", "opomba": "Čezmorska skupnost Velike Britanije v Karibskem morju." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5da"), "dvomestna_koda": "VI", "trimestna_koda": "VIR", "numericna_oznaka": 850, "ISO_naziv": "Virgin Islands, U.S.", "slovenski_naziv": "Ameriški Deviški otoki", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5db"), "dvomestna_koda": "WF", "trimestna_koda": "WLF", "numericna_oznaka": 876, "ISO_naziv": "Wallis and Futuna", "slovenski_naziv": "Otočje Valis in Futuna", "opomba": "Čezmorska skupnost Francije v Pacifiku." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5dc"), "dvomestna_koda": "EH", "trimestna_koda": "ESH", "numericna_oznaka": 732, "ISO_naziv": "Western Sahara", "slovenski_naziv": "Zahodna Sahara", "opomba": "Bivši ISO naziv države: Spanish Sahara (koda po španskem nazivu: Sahara español)." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5dd"), "dvomestna_koda": "YE", "trimestna_koda": "YEM", "numericna_oznaka": 887, "ISO_naziv": "Yemen", "slovenski_naziv": "Jemen", "opomba": "Bivši ISO naziv države: Republic of Yemen, koda se je uporabljala za Severni Jemen pred letom 1990." },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5de"), "dvomestna_koda": "ZM", "trimestna_koda": "ZMB", "numericna_oznaka": 894, "ISO_naziv": "Zambia", "slovenski_naziv": "Zambija", "opomba": "" },
{ "_id": ObjectId("5ac3bbb5eeafcf0f08c3a5df"), "dvomestna_koda": "ZW", "trimestna_koda": "ZWE", "numericna_oznaka": 716, "ISO_naziv": "Zimbabwe", "slovenski_naziv": "Zimbabve", "opomba": "Naziv se je spremenil iz: Suthern Rhodesia (RH, Južna Rodezija)." },
],
    poste: [
{ "_id": ObjectId("5ac3b84dca0b200e0043d002"), "postna_stevilka": "8341", "naziv": "Adlešiči" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d003"), "postna_stevilka": "5270", "naziv": "Ajdovščina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d004"), "postna_stevilka": "6280", "naziv": "Ankaran/Ancarano" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d005"), "postna_stevilka": "9253", "naziv": "Apače" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d006"), "postna_stevilka": "8253", "naziv": "Artiče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d007"), "postna_stevilka": "4275", "naziv": "Begunje na Gorenjskem" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d008"), "postna_stevilka": "1382", "naziv": "Begunje pri Cerknici" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d009"), "postna_stevilka": "9231", "naziv": "Beltinci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d00a"), "postna_stevilka": "2234", "naziv": "Benedikt" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d00b"), "postna_stevilka": "2345", "naziv": "Bistrica ob Dravi" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d00c"), "postna_stevilka": "3256", "naziv": "Bistrica ob Sotli" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d00d"), "postna_stevilka": "8259", "naziv": "Bizeljsko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d00e"), "postna_stevilka": "1223", "naziv": "Blagovica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d00f"), "postna_stevilka": "8283", "naziv": "Blanca" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d010"), "postna_stevilka": "4260", "naziv": "Bled" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d011"), "postna_stevilka": "4273", "naziv": "Blejska Dobrava" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d012"), "postna_stevilka": "9265", "naziv": "Bodonci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d013"), "postna_stevilka": "9222", "naziv": "Bogojina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d014"), "postna_stevilka": "4263", "naziv": "Bohinjska Bela" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d015"), "postna_stevilka": "4264", "naziv": "Bohinjska Bistrica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d016"), "postna_stevilka": "4265", "naziv": "Bohinjsko jezero" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d017"), "postna_stevilka": "1353", "naziv": "Borovnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d018"), "postna_stevilka": "8294", "naziv": "Boštanj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d019"), "postna_stevilka": "5230", "naziv": "Bovec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d01a"), "postna_stevilka": "5295", "naziv": "Branik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d01b"), "postna_stevilka": "3314", "naziv": "Braslovče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d01c"), "postna_stevilka": "5223", "naziv": "Breginj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d01d"), "postna_stevilka": "8280", "naziv": "Brestanica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d01e"), "postna_stevilka": "2354", "naziv": "Bresternica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d01f"), "postna_stevilka": "4243", "naziv": "Brezje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d020"), "postna_stevilka": "1351", "naziv": "Brezovica pri Ljubljani" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d021"), "postna_stevilka": "8250", "naziv": "Brežice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d022"), "postna_stevilka": "4210", "naziv": "Brnik - Aerodrom" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d023"), "postna_stevilka": "8321", "naziv": "Brusnice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d024"), "postna_stevilka": "3255", "naziv": "Buče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d025"), "postna_stevilka": "8276", "naziv": "Bučka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d026"), "postna_stevilka": "9261", "naziv": "Cankova" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d027"), "postna_stevilka": "3000", "naziv": "Celje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d028"), "postna_stevilka": "3001", "naziv": "Celje - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d029"), "postna_stevilka": "4207", "naziv": "Cerklje na Gorenjskem" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d02a"), "postna_stevilka": "8263", "naziv": "Cerklje ob Krki" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d02b"), "postna_stevilka": "1380", "naziv": "Cerknica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d02c"), "postna_stevilka": "5282", "naziv": "Cerkno" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d02d"), "postna_stevilka": "2236", "naziv": "Cerkvenjak" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d02e"), "postna_stevilka": "2215", "naziv": "Ceršak" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d02f"), "postna_stevilka": "2326", "naziv": "Cirkovce" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d030"), "postna_stevilka": "2282", "naziv": "Cirkulane" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d031"), "postna_stevilka": "5273", "naziv": "Col" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d032"), "postna_stevilka": "8251", "naziv": "Čatež ob Savi" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d033"), "postna_stevilka": "1413", "naziv": "Čemšenik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d034"), "postna_stevilka": "5253", "naziv": "Čepovan" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d035"), "postna_stevilka": "9232", "naziv": "Črenšovci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d036"), "postna_stevilka": "2393", "naziv": "Črna na Koroškem" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d037"), "postna_stevilka": "6275", "naziv": "Črni Kal" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d038"), "postna_stevilka": "5274", "naziv": "Črni Vrh nad Idrijo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d039"), "postna_stevilka": "5262", "naziv": "Črniče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d03a"), "postna_stevilka": "8340", "naziv": "Črnomelj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d03b"), "postna_stevilka": "6271", "naziv": "Dekani" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d03c"), "postna_stevilka": "5210", "naziv": "Deskle" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d03d"), "postna_stevilka": "2253", "naziv": "Destrnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d03e"), "postna_stevilka": "6215", "naziv": "Divača" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d03f"), "postna_stevilka": "1233", "naziv": "Dob" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d040"), "postna_stevilka": "3224", "naziv": "Dobje pri Planini" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d041"), "postna_stevilka": "8257", "naziv": "Dobova" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d042"), "postna_stevilka": "1423", "naziv": "Dobovec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d043"), "postna_stevilka": "5263", "naziv": "Dobravlje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d044"), "postna_stevilka": "3204", "naziv": "Dobrna" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d045"), "postna_stevilka": "8211", "naziv": "Dobrnič" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d046"), "postna_stevilka": "1356", "naziv": "Dobrova" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d047"), "postna_stevilka": "9223", "naziv": "Dobrovnik/Dobronak" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d048"), "postna_stevilka": "5212", "naziv": "Dobrovo v Brdih" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d049"), "postna_stevilka": "1431", "naziv": "Dol pri Hrastniku" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d04a"), "postna_stevilka": "1262", "naziv": "Dol pri Ljubljani" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d04b"), "postna_stevilka": "1273", "naziv": "Dole pri Litiji" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d04c"), "postna_stevilka": "1331", "naziv": "Dolenja vas" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d04d"), "postna_stevilka": "8350", "naziv": "Dolenjske Toplice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d04e"), "postna_stevilka": "1230", "naziv": "Domžale" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d04f"), "postna_stevilka": "2252", "naziv": "Dornava" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d050"), "postna_stevilka": "5294", "naziv": "Dornberk" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d051"), "postna_stevilka": "1319", "naziv": "Draga" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d052"), "postna_stevilka": "8343", "naziv": "Dragatuš" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d053"), "postna_stevilka": "3222", "naziv": "Dramlje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d054"), "postna_stevilka": "2370", "naziv": "Dravograd" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d055"), "postna_stevilka": "4203", "naziv": "Duplje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d056"), "postna_stevilka": "6221", "naziv": "Dutovlje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d057"), "postna_stevilka": "8361", "naziv": "Dvor" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d058"), "postna_stevilka": "2343", "naziv": "Fala" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d059"), "postna_stevilka": "9208", "naziv": "Fokovci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d05a"), "postna_stevilka": "2313", "naziv": "Fram" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d05b"), "postna_stevilka": "3213", "naziv": "Frankolovo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d05c"), "postna_stevilka": "1274", "naziv": "Gabrovka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d05d"), "postna_stevilka": "8254", "naziv": "Globoko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d05e"), "postna_stevilka": "5275", "naziv": "Godovič" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d05f"), "postna_stevilka": "4204", "naziv": "Golnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d060"), "postna_stevilka": "3303", "naziv": "Gomilsko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d061"), "postna_stevilka": "4224", "naziv": "Gorenja vas" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d062"), "postna_stevilka": "3263", "naziv": "Gorica pri Slivnici" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d063"), "postna_stevilka": "2272", "naziv": "Gorišnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d064"), "postna_stevilka": "9250", "naziv": "Gornja Radgona" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d065"), "postna_stevilka": "3342", "naziv": "Gornji Grad" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d066"), "postna_stevilka": "4282", "naziv": "Gozd Martuljek" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d067"), "postna_stevilka": "6272", "naziv": "Gračišče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d068"), "postna_stevilka": "9264", "naziv": "Grad" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d069"), "postna_stevilka": "8332", "naziv": "Gradac" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d06a"), "postna_stevilka": "1384", "naziv": "Grahovo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d06b"), "postna_stevilka": "5242", "naziv": "Grahovo ob Bači" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d06c"), "postna_stevilka": "5251", "naziv": "Grgar" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d06d"), "postna_stevilka": "3302", "naziv": "Griže" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d06e"), "postna_stevilka": "3231", "naziv": "Grobelno" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d06f"), "postna_stevilka": "1290", "naziv": "Grosuplje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d070"), "postna_stevilka": "2288", "naziv": "Hajdina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d071"), "postna_stevilka": "8362", "naziv": "Hinje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d072"), "postna_stevilka": "2311", "naziv": "Hoče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d073"), "postna_stevilka": "9205", "naziv": "Hodoš/Hodos" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d074"), "postna_stevilka": "1354", "naziv": "Horjul" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d075"), "postna_stevilka": "1372", "naziv": "Hotedršica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d076"), "postna_stevilka": "1430", "naziv": "Hrastnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d077"), "postna_stevilka": "6225", "naziv": "Hruševje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d078"), "postna_stevilka": "4276", "naziv": "Hrušica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d079"), "postna_stevilka": "5280", "naziv": "Idrija" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d07a"), "postna_stevilka": "1292", "naziv": "Ig" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d07b"), "postna_stevilka": "6250", "naziv": "Ilirska Bistrica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d07c"), "postna_stevilka": "6251", "naziv": "Ilirska Bistrica-Trnovo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d07d"), "postna_stevilka": "1295", "naziv": "Ivančna Gorica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d07e"), "postna_stevilka": "2259", "naziv": "Ivanjkovci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d07f"), "postna_stevilka": "1411", "naziv": "Izlake" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d080"), "postna_stevilka": "6310", "naziv": "Izola/Isola" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d081"), "postna_stevilka": "2222", "naziv": "Jakobski Dol" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d082"), "postna_stevilka": "2221", "naziv": "Jarenina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d083"), "postna_stevilka": "6254", "naziv": "Jelšane" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d084"), "postna_stevilka": "4270", "naziv": "Jesenice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d085"), "postna_stevilka": "8261", "naziv": "Jesenice na Dolenjskem" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d086"), "postna_stevilka": "3273", "naziv": "Jurklošter" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d087"), "postna_stevilka": "2223", "naziv": "Jurovski Dol" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d088"), "postna_stevilka": "2256", "naziv": "Juršinci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d089"), "postna_stevilka": "5214", "naziv": "Kal nad Kanalom" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d08a"), "postna_stevilka": "3233", "naziv": "Kalobje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d08b"), "postna_stevilka": "4246", "naziv": "Kamna Gorica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d08c"), "postna_stevilka": "2351", "naziv": "Kamnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d08d"), "postna_stevilka": "1241", "naziv": "Kamnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d08e"), "postna_stevilka": "5213", "naziv": "Kanal" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d08f"), "postna_stevilka": "8258", "naziv": "Kapele" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d090"), "postna_stevilka": "2362", "naziv": "Kapla" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d091"), "postna_stevilka": "2325", "naziv": "Kidričevo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d092"), "postna_stevilka": "1412", "naziv": "Kisovec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d093"), "postna_stevilka": "6253", "naziv": "Knežak" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d094"), "postna_stevilka": "5222", "naziv": "Kobarid" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d095"), "postna_stevilka": "9227", "naziv": "Kobilje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d096"), "postna_stevilka": "1330", "naziv": "Kočevje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d097"), "postna_stevilka": "1338", "naziv": "Kočevska Reka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d098"), "postna_stevilka": "2276", "naziv": "Kog" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d099"), "postna_stevilka": "5211", "naziv": "Kojsko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d09a"), "postna_stevilka": "6223", "naziv": "Komen" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d09b"), "postna_stevilka": "1218", "naziv": "Komenda" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d09c"), "postna_stevilka": "6000", "naziv": "Koper/Capodistria" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d09d"), "postna_stevilka": "6001", "naziv": "Koper/Capodistria - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d09e"), "postna_stevilka": "8282", "naziv": "Koprivnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d09f"), "postna_stevilka": "5296", "naziv": "Kostanjevica na Krasu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a0"), "postna_stevilka": "8311", "naziv": "Kostanjevica na Krki" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a1"), "postna_stevilka": "1336", "naziv": "Kostel" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a2"), "postna_stevilka": "6256", "naziv": "Košana" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a3"), "postna_stevilka": "2394", "naziv": "Kotlje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a4"), "postna_stevilka": "6240", "naziv": "Kozina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a5"), "postna_stevilka": "3260", "naziv": "Kozje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a6"), "postna_stevilka": "4000", "naziv": "Kranj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a7"), "postna_stevilka": "4001", "naziv": "Kranj - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a8"), "postna_stevilka": "4280", "naziv": "Kranjska Gora" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0a9"), "postna_stevilka": "1281", "naziv": "Kresnice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0aa"), "postna_stevilka": "4294", "naziv": "Križe" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ab"), "postna_stevilka": "9206", "naziv": "Križevci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ac"), "postna_stevilka": "9242", "naziv": "Križevci pri Ljutomeru" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ad"), "postna_stevilka": "1301", "naziv": "Krka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ae"), "postna_stevilka": "8296", "naziv": "Krmelj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0af"), "postna_stevilka": "4245", "naziv": "Kropa" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b0"), "postna_stevilka": "8262", "naziv": "Krška vas" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b1"), "postna_stevilka": "8270", "naziv": "Krško" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b2"), "postna_stevilka": "9263", "naziv": "Kuzma" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b3"), "postna_stevilka": "2318", "naziv": "Laporje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b4"), "postna_stevilka": "3270", "naziv": "Laško" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b5"), "postna_stevilka": "1219", "naziv": "Laze v Tuhinju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b6"), "postna_stevilka": "2230", "naziv": "Lenart v Slovenskih goricah" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b7"), "postna_stevilka": "9220", "naziv": "Lendava/Lendva" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b8"), "postna_stevilka": "4248", "naziv": "Lesce" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0b9"), "postna_stevilka": "3261", "naziv": "Lesično" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ba"), "postna_stevilka": "8273", "naziv": "Leskovec pri Krškem" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0bb"), "postna_stevilka": "2372", "naziv": "Libeliče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0bc"), "postna_stevilka": "2341", "naziv": "Limbuš" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0bd"), "postna_stevilka": "1270", "naziv": "Litija" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0be"), "postna_stevilka": "3202", "naziv": "Ljubečna" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0bf"), "postna_stevilka": "1000", "naziv": "Ljubljana" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c0"), "postna_stevilka": "1001", "naziv": "Ljubljana - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c1"), "postna_stevilka": "1231", "naziv": "Ljubljana - Črnuče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c2"), "postna_stevilka": "1261", "naziv": "Ljubljana - Dobrunje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c3"), "postna_stevilka": "1260", "naziv": "Ljubljana - Polje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c4"), "postna_stevilka": "1210", "naziv": "Ljubljana - Šentvid" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c5"), "postna_stevilka": "1211", "naziv": "Ljubljana - Šmartno" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c6"), "postna_stevilka": "3333", "naziv": "Ljubno ob Savinji" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c7"), "postna_stevilka": "9240", "naziv": "Ljutomer" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c8"), "postna_stevilka": "3215", "naziv": "Loče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0c9"), "postna_stevilka": "5231", "naziv": "Log pod Mangartom" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ca"), "postna_stevilka": "1358", "naziv": "Log pri Brezovici" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0cb"), "postna_stevilka": "1370", "naziv": "Logatec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0cc"), "postna_stevilka": "1371", "naziv": "Logatec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0cd"), "postna_stevilka": "1434", "naziv": "Loka pri Zidanem Mostu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ce"), "postna_stevilka": "3223", "naziv": "Loka pri Žusmu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0cf"), "postna_stevilka": "6219", "naziv": "Lokev" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d0"), "postna_stevilka": "1318", "naziv": "Loški Potok" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d1"), "postna_stevilka": "2324", "naziv": "Lovrenc na Dravskem polju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d2"), "postna_stevilka": "2344", "naziv": "Lovrenc na Pohorju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d3"), "postna_stevilka": "3334", "naziv": "Luče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d4"), "postna_stevilka": "1225", "naziv": "Lukovica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d5"), "postna_stevilka": "9202", "naziv": "Mačkovci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d6"), "postna_stevilka": "2322", "naziv": "Majšperk" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d7"), "postna_stevilka": "2321", "naziv": "Makole" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d8"), "postna_stevilka": "9243", "naziv": "Mala Nedelja" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0d9"), "postna_stevilka": "2229", "naziv": "Malečnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0da"), "postna_stevilka": "6273", "naziv": "Marezige" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0db"), "postna_stevilka": "2000", "naziv": "Maribor" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0dc"), "postna_stevilka": "2001", "naziv": "Maribor - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0dd"), "postna_stevilka": "2206", "naziv": "Marjeta na Dravskem polju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0de"), "postna_stevilka": "2281", "naziv": "Markovci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0df"), "postna_stevilka": "9221", "naziv": "Martjanci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e0"), "postna_stevilka": "6242", "naziv": "Materija" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e1"), "postna_stevilka": "4211", "naziv": "Mavčiče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e2"), "postna_stevilka": "1215", "naziv": "Medvode" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e3"), "postna_stevilka": "1234", "naziv": "Mengeš" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e4"), "postna_stevilka": "8330", "naziv": "Metlika" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e5"), "postna_stevilka": "2392", "naziv": "Mežica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e6"), "postna_stevilka": "2204", "naziv": "Miklavž na Dravskem polju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e7"), "postna_stevilka": "2275", "naziv": "Miklavž pri Ormožu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e8"), "postna_stevilka": "5291", "naziv": "Miren" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0e9"), "postna_stevilka": "8233", "naziv": "Mirna" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ea"), "postna_stevilka": "8216", "naziv": "Mirna Peč" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0eb"), "postna_stevilka": "2382", "naziv": "Mislinja" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ec"), "postna_stevilka": "4281", "naziv": "Mojstrana" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ed"), "postna_stevilka": "8230", "naziv": "Mokronog" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ee"), "postna_stevilka": "1251", "naziv": "Moravče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ef"), "postna_stevilka": "9226", "naziv": "Moravske Toplice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f0"), "postna_stevilka": "5216", "naziv": "Most na Soči" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f1"), "postna_stevilka": "1221", "naziv": "Motnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f2"), "postna_stevilka": "3330", "naziv": "Mozirje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f3"), "postna_stevilka": "9000", "naziv": "Murska Sobota" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f4"), "postna_stevilka": "9001", "naziv": "Murska Sobota - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f5"), "postna_stevilka": "2366", "naziv": "Muta" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f6"), "postna_stevilka": "4202", "naziv": "Naklo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f7"), "postna_stevilka": "3331", "naziv": "Nazarje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f8"), "postna_stevilka": "1357", "naziv": "Notranje Gorice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0f9"), "postna_stevilka": "3203", "naziv": "Nova Cerkev" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0fa"), "postna_stevilka": "5000", "naziv": "Nova Gorica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0fb"), "postna_stevilka": "5001", "naziv": "Nova Gorica - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0fc"), "postna_stevilka": "1385", "naziv": "Nova vas" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0fd"), "postna_stevilka": "8000", "naziv": "Novo mesto" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0fe"), "postna_stevilka": "8001", "naziv": "Novo mesto - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d0ff"), "postna_stevilka": "6243", "naziv": "Obrov" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d100"), "postna_stevilka": "9233", "naziv": "Odranci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d101"), "postna_stevilka": "2317", "naziv": "Oplotnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d102"), "postna_stevilka": "2312", "naziv": "Orehova vas" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d103"), "postna_stevilka": "2270", "naziv": "Ormož" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d104"), "postna_stevilka": "1316", "naziv": "Ortnek" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d105"), "postna_stevilka": "1337", "naziv": "Osilnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d106"), "postna_stevilka": "8222", "naziv": "Otočec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d107"), "postna_stevilka": "2361", "naziv": "Ožbalt" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d108"), "postna_stevilka": "2231", "naziv": "Pernica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d109"), "postna_stevilka": "2211", "naziv": "Pesnica pri Mariboru" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d10a"), "postna_stevilka": "9203", "naziv": "Petrovci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d10b"), "postna_stevilka": "3301", "naziv": "Petrovče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d10c"), "postna_stevilka": "6330", "naziv": "Piran/Pirano" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d10d"), "postna_stevilka": "8255", "naziv": "Pišece" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d10e"), "postna_stevilka": "6257", "naziv": "Pivka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d10f"), "postna_stevilka": "6232", "naziv": "Planina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d110"), "postna_stevilka": "3225", "naziv": "Planina pri Sevnici" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d111"), "postna_stevilka": "6276", "naziv": "Pobegi" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d112"), "postna_stevilka": "8312", "naziv": "Podbočje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d113"), "postna_stevilka": "5243", "naziv": "Podbrdo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d114"), "postna_stevilka": "3254", "naziv": "Podčetrtek" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d115"), "postna_stevilka": "2273", "naziv": "Podgorci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d116"), "postna_stevilka": "6216", "naziv": "Podgorje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d117"), "postna_stevilka": "2381", "naziv": "Podgorje pri Slovenj Gradcu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d118"), "postna_stevilka": "6244", "naziv": "Podgrad" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d119"), "postna_stevilka": "1414", "naziv": "Podkum" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d11a"), "postna_stevilka": "2286", "naziv": "Podlehnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d11b"), "postna_stevilka": "5272", "naziv": "Podnanos" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d11c"), "postna_stevilka": "4244", "naziv": "Podnart" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d11d"), "postna_stevilka": "3241", "naziv": "Podplat" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d11e"), "postna_stevilka": "3257", "naziv": "Podsreda" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d11f"), "postna_stevilka": "2363", "naziv": "Podvelka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d120"), "postna_stevilka": "2208", "naziv": "Pohorje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d121"), "postna_stevilka": "2257", "naziv": "Polenšak" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d122"), "postna_stevilka": "1355", "naziv": "Polhov Gradec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d123"), "postna_stevilka": "4223", "naziv": "Poljane nad Škofjo Loko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d124"), "postna_stevilka": "2319", "naziv": "Poljčane" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d125"), "postna_stevilka": "1272", "naziv": "Polšnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d126"), "postna_stevilka": "3313", "naziv": "Polzela" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d127"), "postna_stevilka": "3232", "naziv": "Ponikva" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d128"), "postna_stevilka": "6320", "naziv": "Portorož/Portorose" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d129"), "postna_stevilka": "6230", "naziv": "Postojna" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d12a"), "postna_stevilka": "2331", "naziv": "Pragersko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d12b"), "postna_stevilka": "3312", "naziv": "Prebold" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d12c"), "postna_stevilka": "4205", "naziv": "Preddvor" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d12d"), "postna_stevilka": "6255", "naziv": "Prem" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d12e"), "postna_stevilka": "1352", "naziv": "Preserje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d12f"), "postna_stevilka": "6258", "naziv": "Prestranek" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d130"), "postna_stevilka": "2391", "naziv": "Prevalje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d131"), "postna_stevilka": "3262", "naziv": "Prevorje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d132"), "postna_stevilka": "1276", "naziv": "Primskovo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d133"), "postna_stevilka": "3253", "naziv": "Pristava pri Mestinju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d134"), "postna_stevilka": "9207", "naziv": "Prosenjakovci/Partosfalva" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d135"), "postna_stevilka": "5297", "naziv": "Prvačina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d136"), "postna_stevilka": "2250", "naziv": "Ptuj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d137"), "postna_stevilka": "2323", "naziv": "Ptujska Gora" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d138"), "postna_stevilka": "9201", "naziv": "Puconci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d139"), "postna_stevilka": "2327", "naziv": "Rače" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d13a"), "postna_stevilka": "1433", "naziv": "Radeče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d13b"), "postna_stevilka": "9252", "naziv": "Radenci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d13c"), "postna_stevilka": "2360", "naziv": "Radlje ob Dravi" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d13d"), "postna_stevilka": "1235", "naziv": "Radomlje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d13e"), "postna_stevilka": "4240", "naziv": "Radovljica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d13f"), "postna_stevilka": "8274", "naziv": "Raka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d140"), "postna_stevilka": "1381", "naziv": "Rakek" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d141"), "postna_stevilka": "4283", "naziv": "Rateče - Planica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d142"), "postna_stevilka": "2390", "naziv": "Ravne na Koroškem" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d143"), "postna_stevilka": "9246", "naziv": "Razkrižje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d144"), "postna_stevilka": "3332", "naziv": "Rečica ob Savinji" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d145"), "postna_stevilka": "5292", "naziv": "Renče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d146"), "postna_stevilka": "1310", "naziv": "Ribnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d147"), "postna_stevilka": "2364", "naziv": "Ribnica na Pohorju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d148"), "postna_stevilka": "3272", "naziv": "Rimske Toplice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d149"), "postna_stevilka": "1314", "naziv": "Rob" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d14a"), "postna_stevilka": "5215", "naziv": "Ročinj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d14b"), "postna_stevilka": "3250", "naziv": "Rogaška Slatina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d14c"), "postna_stevilka": "9262", "naziv": "Rogašovci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d14d"), "postna_stevilka": "3252", "naziv": "Rogatec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d14e"), "postna_stevilka": "1373", "naziv": "Rovte" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d14f"), "postna_stevilka": "2342", "naziv": "Ruše" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d150"), "postna_stevilka": "1282", "naziv": "Sava" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d151"), "postna_stevilka": "6333", "naziv": "Sečovlje/Sicciole" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d152"), "postna_stevilka": "4227", "naziv": "Selca" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d153"), "postna_stevilka": "2352", "naziv": "Selnica ob Dravi" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d154"), "postna_stevilka": "8333", "naziv": "Semič" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d155"), "postna_stevilka": "8281", "naziv": "Senovo" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d156"), "postna_stevilka": "6224", "naziv": "Senožeče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d157"), "postna_stevilka": "8290", "naziv": "Sevnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d158"), "postna_stevilka": "6210", "naziv": "Sežana" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d159"), "postna_stevilka": "2214", "naziv": "Sladki Vrh" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d15a"), "postna_stevilka": "5283", "naziv": "Slap ob Idrijci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d15b"), "postna_stevilka": "2380", "naziv": "Slovenj Gradec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d15c"), "postna_stevilka": "2310", "naziv": "Slovenska Bistrica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d15d"), "postna_stevilka": "3210", "naziv": "Slovenske Konjice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d15e"), "postna_stevilka": "1216", "naziv": "Smlednik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d15f"), "postna_stevilka": "5232", "naziv": "Soča" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d160"), "postna_stevilka": "1317", "naziv": "Sodražica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d161"), "postna_stevilka": "3335", "naziv": "Solčava" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d162"), "postna_stevilka": "5250", "naziv": "Solkan" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d163"), "postna_stevilka": "4229", "naziv": "Sorica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d164"), "postna_stevilka": "4225", "naziv": "Sovodenj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d165"), "postna_stevilka": "5281", "naziv": "Spodnja Idrija" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d166"), "postna_stevilka": "2241", "naziv": "Spodnji Duplek" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d167"), "postna_stevilka": "9245", "naziv": "Spodnji Ivanjci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d168"), "postna_stevilka": "2277", "naziv": "Središče ob Dravi" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d169"), "postna_stevilka": "4267", "naziv": "Srednja vas v Bohinju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d16a"), "postna_stevilka": "8256", "naziv": "Sromlje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d16b"), "postna_stevilka": "5224", "naziv": "Srpenica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d16c"), "postna_stevilka": "1242", "naziv": "Stahovica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d16d"), "postna_stevilka": "1332", "naziv": "Stara Cerkev" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d16e"), "postna_stevilka": "8342", "naziv": "Stari trg ob Kolpi" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d16f"), "postna_stevilka": "1386", "naziv": "Stari trg pri Ložu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d170"), "postna_stevilka": "2205", "naziv": "Starše" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d171"), "postna_stevilka": "2289", "naziv": "Stoperce" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d172"), "postna_stevilka": "8322", "naziv": "Stopiče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d173"), "postna_stevilka": "3206", "naziv": "Stranice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d174"), "postna_stevilka": "8351", "naziv": "Straža" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d175"), "postna_stevilka": "1313", "naziv": "Struge" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d176"), "postna_stevilka": "8293", "naziv": "Studenec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d177"), "postna_stevilka": "8331", "naziv": "Suhor" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d178"), "postna_stevilka": "2233", "naziv": "Sv. Ana v Slovenskih goricah" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d179"), "postna_stevilka": "2235", "naziv": "Sv. Trojica v Slovenskih goricah" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d17a"), "postna_stevilka": "2353", "naziv": "Sveti Duh na Ostrem Vrhu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d17b"), "postna_stevilka": "9244", "naziv": "Sveti Jurij ob Ščavnici" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d17c"), "postna_stevilka": "3264", "naziv": "Sveti Štefan" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d17d"), "postna_stevilka": "2258", "naziv": "Sveti Tomaž" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d17e"), "postna_stevilka": "9204", "naziv": "Šalovci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d17f"), "postna_stevilka": "5261", "naziv": "Šempas" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d180"), "postna_stevilka": "5290", "naziv": "Šempeter pri Gorici" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d181"), "postna_stevilka": "3311", "naziv": "Šempeter v Savinjski dolini" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d182"), "postna_stevilka": "4208", "naziv": "Šenčur" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d183"), "postna_stevilka": "2212", "naziv": "Šentilj v Slovenskih goricah" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d184"), "postna_stevilka": "8297", "naziv": "Šentjanž" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d185"), "postna_stevilka": "2373", "naziv": "Šentjanž pri Dravogradu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d186"), "postna_stevilka": "8310", "naziv": "Šentjernej" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d187"), "postna_stevilka": "3230", "naziv": "Šentjur" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d188"), "postna_stevilka": "3271", "naziv": "Šentrupert" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d189"), "postna_stevilka": "8232", "naziv": "Šentrupert" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d18a"), "postna_stevilka": "1296", "naziv": "Šentvid pri Stični" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d18b"), "postna_stevilka": "8275", "naziv": "Škocjan" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d18c"), "postna_stevilka": "6281", "naziv": "Škofije" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d18d"), "postna_stevilka": "4220", "naziv": "Škofja Loka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d18e"), "postna_stevilka": "3211", "naziv": "Škofja vas" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d18f"), "postna_stevilka": "1291", "naziv": "Škofljica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d190"), "postna_stevilka": "6274", "naziv": "Šmarje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d191"), "postna_stevilka": "1293", "naziv": "Šmarje - Sap" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d192"), "postna_stevilka": "3240", "naziv": "Šmarje pri Jelšah" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d193"), "postna_stevilka": "8220", "naziv": "Šmarješke Toplice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d194"), "postna_stevilka": "2315", "naziv": "Šmartno na Pohorju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d195"), "postna_stevilka": "3341", "naziv": "Šmartno ob Dreti" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d196"), "postna_stevilka": "3327", "naziv": "Šmartno ob Paki" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d197"), "postna_stevilka": "1275", "naziv": "Šmartno pri Litiji" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d198"), "postna_stevilka": "2383", "naziv": "Šmartno pri Slovenj Gradcu" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d199"), "postna_stevilka": "3201", "naziv": "Šmartno v Rožni dolini" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d19a"), "postna_stevilka": "3325", "naziv": "Šoštanj" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d19b"), "postna_stevilka": "6222", "naziv": "Štanjel" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d19c"), "postna_stevilka": "3220", "naziv": "Štore" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d19d"), "postna_stevilka": "3304", "naziv": "Tabor" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d19e"), "postna_stevilka": "3221", "naziv": "Teharje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d19f"), "postna_stevilka": "9251", "naziv": "Tišina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a0"), "postna_stevilka": "5220", "naziv": "Tolmin" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a1"), "postna_stevilka": "3326", "naziv": "Topolšica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a2"), "postna_stevilka": "2371", "naziv": "Trbonje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a3"), "postna_stevilka": "1420", "naziv": "Trbovlje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a4"), "postna_stevilka": "8231", "naziv": "Trebelno" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a5"), "postna_stevilka": "8210", "naziv": "Trebnje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a6"), "postna_stevilka": "5252", "naziv": "Trnovo pri Gorici" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a7"), "postna_stevilka": "2254", "naziv": "Trnovska vas" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a8"), "postna_stevilka": "1222", "naziv": "Trojane" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1a9"), "postna_stevilka": "1236", "naziv": "Trzin" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1aa"), "postna_stevilka": "4290", "naziv": "Tržič" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1ab"), "postna_stevilka": "8295", "naziv": "Tržišče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1ac"), "postna_stevilka": "1311", "naziv": "Turjak" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1ad"), "postna_stevilka": "9224", "naziv": "Turnišče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1ae"), "postna_stevilka": "8323", "naziv": "Uršna sela" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1af"), "postna_stevilka": "1252", "naziv": "Vače" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b0"), "postna_stevilka": "3320", "naziv": "Velenje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b1"), "postna_stevilka": "3322", "naziv": "Velenje - poštni predali" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b2"), "postna_stevilka": "8212", "naziv": "Velika Loka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b3"), "postna_stevilka": "2274", "naziv": "Velika Nedelja" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b4"), "postna_stevilka": "9225", "naziv": "Velika Polana" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b5"), "postna_stevilka": "1315", "naziv": "Velike Lašče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b6"), "postna_stevilka": "8213", "naziv": "Veliki Gaber" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b7"), "postna_stevilka": "9241", "naziv": "Veržej" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b8"), "postna_stevilka": "1312", "naziv": "Videm - Dobrepolje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1b9"), "postna_stevilka": "2284", "naziv": "Videm pri Ptuju" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1ba"), "postna_stevilka": "8344", "naziv": "Vinica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1bb"), "postna_stevilka": "5271", "naziv": "Vipava" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1bc"), "postna_stevilka": "4212", "naziv": "Visoko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1bd"), "postna_stevilka": "1294", "naziv": "Višnja Gora" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1be"), "postna_stevilka": "3205", "naziv": "Vitanje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1bf"), "postna_stevilka": "2255", "naziv": "Vitomarci" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c0"), "postna_stevilka": "1217", "naziv": "Vodice" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c1"), "postna_stevilka": "3212", "naziv": "Vojnik" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c2"), "postna_stevilka": "5293", "naziv": "Volčja Draga" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c3"), "postna_stevilka": "2232", "naziv": "Voličina" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c4"), "postna_stevilka": "3305", "naziv": "Vransko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c5"), "postna_stevilka": "6217", "naziv": "Vremski Britof" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c6"), "postna_stevilka": "1360", "naziv": "Vrhnika" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c7"), "postna_stevilka": "2365", "naziv": "Vuhred" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c8"), "postna_stevilka": "2367", "naziv": "Vuzenica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1c9"), "postna_stevilka": "8292", "naziv": "Zabukovje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1ca"), "postna_stevilka": "1410", "naziv": "Zagorje ob Savi" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1cb"), "postna_stevilka": "1303", "naziv": "Zagradec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1cc"), "postna_stevilka": "2283", "naziv": "Zavrč" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1cd"), "postna_stevilka": "8272", "naziv": "Zdole" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1ce"), "postna_stevilka": "4201", "naziv": "Zgornja Besnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1cf"), "postna_stevilka": "2242", "naziv": "Zgornja Korena" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d0"), "postna_stevilka": "2201", "naziv": "Zgornja Kungota" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d1"), "postna_stevilka": "2316", "naziv": "Zgornja Ložnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d2"), "postna_stevilka": "2314", "naziv": "Zgornja Polskava" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d3"), "postna_stevilka": "2213", "naziv": "Zgornja Velka" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d4"), "postna_stevilka": "4247", "naziv": "Zgornje Gorje" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d5"), "postna_stevilka": "4206", "naziv": "Zgornje Jezersko" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d6"), "postna_stevilka": "2285", "naziv": "Zgornji Leskovec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d7"), "postna_stevilka": "1432", "naziv": "Zidani Most" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d8"), "postna_stevilka": "3214", "naziv": "Zreče" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1d9"), "postna_stevilka": "4209", "naziv": "Žabnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1da"), "postna_stevilka": "3310", "naziv": "Žalec" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1db"), "postna_stevilka": "4228", "naziv": "Železniki" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1dc"), "postna_stevilka": "2287", "naziv": "Žetale" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1dd"), "postna_stevilka": "4226", "naziv": "Žiri" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1de"), "postna_stevilka": "4274", "naziv": "Žirovnica" },
{ "_id": ObjectId("5ac3b84dca0b200e0043d1df"), "postna_stevilka": "8360", "naziv": "Žužemberk" }
    ],
    
    studijskaLeta: [
{ "_id": ObjectId("5ac3c4553f0fb21a058ff3d8"), "studijsko_leto": "2015/2016" },
{ "_id": ObjectId("5ac3c4553f0fb21a058ff3d9"), "studijsko_leto": "2016/2017" },
{ "_id": ObjectId("5ac3c4553f0fb21a058ff3da"), "studijsko_leto": "2017/2018" },
],
    
    vrsteStudija: [
{ "_id": ObjectId("5ac8bb39c3e49f0ee16a8b35"), "sifra": 16203, "opis": "Visokošolska strokovna izobrazba (prva bolonjska stopnja)", "klasiusSRV": "6/2", "predpona": "J" },
{ "_id": ObjectId("5ac8bb39c3e49f0ee16a8b36"), "sifra": 16204, "opis": "Visokošolska univerzitetna izobrazba (prva bolonjska stopnja)", "klasiusSRV": "6/2", "predpona": "K" },
    ],
    vrsteVpisev: [
{ "_id": ObjectId("5ac8be2a7482291008d3f9f5"), "koda": 1, "naziv": "Prvi vpis v letnik/dodatno leto", "opis": "Vsi letniki in dodatno leto" },
{ "_id": ObjectId("5ac8be2a7482291008d3f9f6"), "koda": 2, "naziv": "Ponavljanje letnika", "opis": "V zadnjem letniku in v dodatnem letu ponavljanje ni možno." },
{ "_id": ObjectId("5ac8be2a7482291008d3f9f7"), "koda": 3, "naziv": "Nadaljevanje letnika", "opis": "Vpis ni več dovoljen", valid: false },
{ "_id": ObjectId("5ac8be2a7482291008d3f9f8"), "koda": 4, "naziv": "Podaljšanje statusa študenta", "opis": "Vsi letniki, dodatno leto" },
{ "_id": ObjectId("5ac8be2a7482291008d3f9f9"), "koda": 5, "naziv": "Vpis po merilih za prehode v višji letnik", "opis": "Vsi letniki razen prvega, dodatno leto ni dovoljeno." },
{ "_id": ObjectId("5ac8be2a7482291008d3f9fa"), "koda": 6, "naziv": "Vpis v semester skupnega št. programa", "opis": "Vsi letniki, samo za skupne študijske programe." },
{ "_id": ObjectId("5ac8be2a7482291008d3f9fb"), "koda": 7, "naziv": "Vpis po merilih za prehode v isti letnik", "opis": "Vsi letniki, dodatno leto ni dovoljeno." },
{ "_id": ObjectId("5ac8be2a7482291008d3f9fc"), "koda": 98, "naziv": "Vpis za zaključek", "opis": "Zadnji letnik. Namenjeno samo strokovnim delavcem v študentskem referatu.", valid: false },
    ],
    oblikeStudija: [
{ "_id": ObjectId("5ac8beac24ee18109953514b"), "sifra": 1, "naziv": "na lokaciji" },
{ "_id": ObjectId("5ac8beac24ee18109953514c"), "sifra": 2, "naziv": "na daljavo" },
{ "_id": ObjectId("5ac8beac24ee18109953514d"), "sifra": 3, "naziv": "e-študij" }
    ],
    naciniStudija: [
{ "_id": ObjectId("5ac8bef1477ab810cd9647f4"), "sifra": 1, "naziv": "redni" },
{ "_id": ObjectId("5ac8bef1477ab810cd9647f5"), "sifra": 3, "naziv": "izredni" }
    ],
    
    studijskiProgrami: [
{ "_id": ObjectId("5ac8c4739a223311d219b718"), "sifra": "VT", "naziv": "Računalništvo in informatika", "vrstaStudija": ObjectId("5ac8bb39c3e49f0ee16a8b36"), "semestri": 6, "sifraEVS": 1000468 },
{ "_id": ObjectId("5ac8c4739a223311d219b719"), "sifra": "VU", "naziv": "Računalništvo in informatika", "vrstaStudija": ObjectId("5ac8bb39c3e49f0ee16a8b35"), "semestri": 6, "sifraEVS": 1000470 }
    ],
    letniki: [
{ "_id": ObjectId("5ac8d21c962f7b1a105fd312"), "studijskiProgram": ObjectId("5ac8c4739a223311d219b718"), "naziv": "1. letnik" },
{ "_id": ObjectId("5ac8d21c962f7b1a105fd313"), "studijskiProgram": ObjectId("5ac8c4739a223311d219b718"), "naziv": "2. letnik", "pogoj_letnik": ObjectId("5ac8d21c962f7b1a105fd312"), "KT_strokovnihIzbirnihPredmetov": 6, "KT_izbirnihPredmetov": 6 },
{ "_id": ObjectId("5ac8d21c962f7b1a105fd314"), "studijskiProgram": ObjectId("5ac8c4739a223311d219b718"), "naziv": "3. letnik", "pogoj_letnik": ObjectId("5ac8d21c962f7b1a105fd313"), "st_modulov": 36, "KT_izbirnihPredmetov": 6 },
{ "_id": ObjectId("5ac8d21c962f7b1a105fd315"), "studijskiProgram": ObjectId("5ac8c4739a223311d219b719"), "naziv": "1. letnik" },
{ "_id": ObjectId("5ac8d21c962f7b1a105fd316"), "studijskiProgram": ObjectId("5ac8c4739a223311d219b719"), "naziv": "2. letnik", "pogoj_letnik": ObjectId("5ac8d21c962f7b1a105fd315") },
    ],
    
    zaposleni: [
{ "_id": ObjectId("5ac8daee119e6a1c2ab5b25e"), "priimek": "Teacher", "ime": "Super", "naziv": "prof. dr.", email: "test@test.test"},
{ "_id": ObjectId("5ac8daee119e6a1c2ab5b25f"), "priimek": "Assistent", "ime": "Super", "naziv": "as.", email: "test2@test.test" },
    ],
    
    predmeti: [
{"_id":ObjectId("5ac8df8efeae4c1cfd56302e"),"sifra":"63219","naziv":"Matematično modeliranje","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563029"),"sifra":"63283","naziv":"Izračunjivost in računska zahtevnost","opis":"2","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563027"),"sifra":"63208","naziv":"Osnove podatkovnih baz","opis":"2","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563033"),"sifra":"63224","naziv":"Angleški jezik nivo C","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56302b"),"sifra":"63256","naziv":"Teorija informacijskih sistemov","opis":"2","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56303d"),"sifra":"63268","naziv":"Razvoj informacijskih sistemov","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563038"),"sifra":"63767","naziv":"Tehnične veščine (Računalniški vid v praksi)","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563047"),"sifra":"63261","naziv":"Porazdaljeni sistemi","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563045"),"sifra":"63262","naziv":"Zanesljivost in zmogljivost računalniških sistemov","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56303a"),"sifra":"63250","naziv":"Organizacija in management","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56305d"),"sifra":"63703","naziv":"Računska arhitektura","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56302c"),"sifra":"63217","naziv":"Operacijski sistemi","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56304c"),"sifra":"63266","naziv":"Inteligentni sistemi","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563031"),"sifra":"63222","naziv":"Angleški jezik nivo A","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563040"),"sifra":"63255","naziv":"Spletno programiranje","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563044"),"sifra":"63257","naziv":"Modeliranje računalniških omrežij","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56304a"),"sifra":"63263","naziv":"Računalniška zahtevnost in hervistično programiranje","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56304e"),"sifra":"63271","naziv":"Osnove oblikovanja","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563032"),"sifra":"63223","naziv":"Angleški jezik nivo B","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563028"),"sifra":"63213","naziv":"Verjetnost in statistika","opis":"2","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563058"),"sifra":"63707","naziv":"Podatkovne baze","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56304b"),"sifra":"63268","naziv":"Razvoj inteligentnih sistemov","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563041"),"sifra":"63256","naziv":"Tehnologija programske opreme","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56302d"),"sifra":"63218","naziv":"Organizacija računalniških sistemov","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563034"),"sifra":"nevem1","naziv":"Računalništvo v praksi I","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56302a"),"sifra":"63280","naziv":"Algoritmi in podatkovne strukture 2","opis":"2","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563046"),"sifra":"63260","naziv":"Digitalno načrtovanje","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56304d"),"sifra":"63267","naziv":"Umetno zaznavanje","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56303e"),"sifra":"63253","naziv":"Planiranje in upravljanje informatike","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563043"),"sifra":"63259","naziv":"Brezžična in mobilna omrežja","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563055"),"sifra":"63709","naziv":"Operacijski sistemi","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56301d"),"sifra":"63203","naziv":"Diskretne strukture","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d9"),"_id":ObjectId("5aef2d26a615561f4844d2e3"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25f")]},{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3da"),"_id":ObjectId("5aef2d26a615561f4844d2e2"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25f")]},{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef3ec0cabfe0232da43a64"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e"),ObjectId("5ac8daee119e6a1c2ab5b25f")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56301e"),"sifra":"63204","naziv":"Osnove digitalnih vezij","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2f4f6e537f1f5d0327f5"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25f")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563048"),"sifra":"63265","naziv":"Prevajalniki","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563026"),"sifra":"63279","naziv":"Algoritmi in podatkovne strukture 1","opis":"2","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2e726e537f1f5d0327f1"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]},{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d9"),"_id":ObjectId("5aef2e826e537f1f5d0327f2"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]},{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3da"),"_id":ObjectId("5aef2e896e537f1f5d0327f3"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563021"),"sifra":"63207","naziv":"Linearna algebra","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2f9e6e537f1f5d0327f9"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56301c"),"sifra":"63202","naziv":"Osnove Matematične Analize","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d9"),"_id":ObjectId("5aef2d26a615561f4844d2e1"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]},{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3da"),"_id":ObjectId("5aef2d26a615561f4844d2e0"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]},{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef3ee3cabfe0232da43a65"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25f"),ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563020"),"sifra":"63278","naziv":"Programiranje 2","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2f8a6e537f1f5d0327f8"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563059"),"sifra":"63706","naziv":"Programiranje 2","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2f7c6e537f1f5d0327f7"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56301f"),"sifra":"63205","naziv":"Fizika","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2f686e537f1f5d0327f6"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25f")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56301b"),"sifra":"63277","naziv":"Programiranje 1","opis":"1","__v":4,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d9"),"_id":ObjectId("5aef2d26a615561f4844d2df"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]},{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3da"),"_id":ObjectId("5aef2d26a615561f4844d2de"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]},{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef443d85a49424aeea91a5"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56303b"),"sifra":"63251","naziv":"Uvod v odkrivanje znanj iz podatkov","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56303f"),"sifra":"63254","naziv":"Postopki razvoja programske opreme","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563036"),"sifra":"nevem2","naziv":"Računalništvo v praksi II","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563049"),"sifra":"63264","naziv":"Sistemska programska oprema","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56305b"),"sifra":"63704","naziv":"Matematika","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563054"),"sifra":"63710","naziv":"Osnove verjetnosti in statistike","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56303c"),"sifra":"63226","naziv":"Tehnologija upravljanja podatkov","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563039"),"sifra":"63249","naziv":"Elektronsko poslovanje","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563052"),"sifra":"63248","naziv":"Ekonomika in podjetništvo","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563057"),"sifra":"63702","naziv":"Programiranje 1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef3bb92aa8ef22bff92759"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25f")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563024"),"sifra":"63209","naziv":"Računalniške komunikacije","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2fc26e537f1f5d0327fb"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56305a"),"sifra":"63705","naziv":"Diskretne strukture","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2f316e537f1f5d0327f4"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25f")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563035"),"sifra":"63284","naziv":"Tehnične veščine (Funkcijsko programiranje za splet","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563030"),"sifra":"63220","naziv":"Principi programskih jezikov","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563042"),"sifra":"63258","naziv":"Komunikacijski protokoli","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563051"),"sifra":"63214","naziv":"Osnove umetne inteligence","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563053"),"sifra":"63281","naziv":"Diplomski seminar","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56304f"),"sifra":"63270","naziv":"Multimedijski sistemi","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563037"),"sifra":"63536B","naziv":"Izbrana poglavja it računalništva in informatike","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563050"),"sifra":"63269","naziv":"Računalniška grafika in tehnologija iger","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56302f"),"sifra":"63221","naziv":"Računalniške tehnologije","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd56305c"),"sifra":"63701","naziv":"Uvod v računalništvo","__v":0,"valid":true,"izvedbe_predmeta":[],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563023"),"sifra":"63212","naziv":"Arhitektura računalniških sistemov","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2faf6e537f1f5d0327fa"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563056"),"sifra":"63708","naziv":"Računalniške komunikacije","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2fd26e537f1f5d0327fc"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25e")]}],"KT":6},
{"_id":ObjectId("5ac8df8efeae4c1cfd563025"),"sifra":"63215","naziv":"Osnove informacijskih sistemov","opis":"1","__v":0,"valid":true,"izvedbe_predmeta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"_id":ObjectId("5aef2fe96e537f1f5d0327fd"),"izpiti":[],"izvajalci":[ObjectId("5ac8daee119e6a1c2ab5b25f")]}],"KT":6},
    ],
    deliPredmetnika: [
{ "_id": ObjectId("5ac8d60f7bfd491b48490279"), "sifra": 1, "naziv": "obvezni predmeti", "obvezen": true },
{ "_id": ObjectId("5ac8d60f7bfd491b4849027a"), "sifra": 2, "naziv": "strokovni izbirni", "obvezen": false, "strokovni": true },
{ "_id": ObjectId("5ac8d60f7bfd491b4849027b"), "sifra": 3, "naziv": "splošni izbirni", "obvezen": false },
{ "_id": ObjectId("5ac8d60f7bfd491b4849027c"), "sifra": 4, "naziv": "moduli", "obvezen": false, "modul": true }
    ],
    predmetniki: [
{"_id":ObjectId("5ac8e2dddf3a431fd3d29278"),"studijski_program":ObjectId("5ac8c4739a223311d219b718"),"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3da"),"letnik":ObjectId("5ac8d21c962f7b1a105fd312"),"del_predmetnika":ObjectId("5ac8d60f7bfd491b48490279"),"valid":true,"predmeti":[ObjectId("5ac8df8efeae4c1cfd56301b"),ObjectId("5ac8df8efeae4c1cfd56301c"),ObjectId("5ac8df8efeae4c1cfd56301d"),ObjectId("5ac8df8efeae4c1cfd56301e"),ObjectId("5ac8df8efeae4c1cfd56301f"),ObjectId("5ac8df8efeae4c1cfd563020"),ObjectId("5ac8df8efeae4c1cfd563021"),ObjectId("5ac8df8efeae4c1cfd563023"),ObjectId("5ac8df8efeae4c1cfd563024"),ObjectId("5ac8df8efeae4c1cfd563025")],"__v":8},
{"_id":ObjectId("5ac8e2dddf3a431fd3d29279"),"studijski_program":ObjectId("5ac8c4739a223311d219b718"),"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d9"),"letnik":ObjectId("5ac8d21c962f7b1a105fd313"),"del_predmetnika":ObjectId("5ac8d60f7bfd491b4849027a"),"valid":true,"predmeti":[ObjectId("5ac8df8efeae4c1cfd56302e"),ObjectId("5ac8df8efeae4c1cfd56302f"),ObjectId("5ac8df8efeae4c1cfd563030")],"__v":5},
{"_id":ObjectId("5aef2af388d40a1cd037706a"),"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d9"),"studijski_program":ObjectId("5ac8c4739a223311d219b718"),"letnik":ObjectId("5ac8d21c962f7b1a105fd313"),"del_predmetnika":ObjectId("5ac8d60f7bfd491b48490279"),"valid":true,"predmeti":[ObjectId("5ac8df8efeae4c1cfd56302a"),ObjectId("5ac8df8efeae4c1cfd563026"),ObjectId("5ac8df8efeae4c1cfd563027"),ObjectId("5ac8df8efeae4c1cfd563028"),ObjectId("5ac8df8efeae4c1cfd563029"),ObjectId("5ac8df8efeae4c1cfd56302b"),ObjectId("5ac8df8efeae4c1cfd56302c"),ObjectId("5ac8df8efeae4c1cfd56302d")],"__v":8},
{"_id":ObjectId("5aef2bcc88d40a1cd037706b"),"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3da"),"studijski_program":ObjectId("5ac8c4739a223311d219b718"),"letnik":ObjectId("5ac8d21c962f7b1a105fd314"),"del_predmetnika":ObjectId("5ac8d60f7bfd491b48490279"),"valid":true,"predmeti":[ObjectId("5ac8df8efeae4c1cfd563051"),ObjectId("5ac8df8efeae4c1cfd563052"),ObjectId("5ac8df8efeae4c1cfd563053")],"__v":3},
    ],
    izpiti: [
{"_id":ObjectId("5ac8e4fb4d6b0b20b65b9573"),"predmet":ObjectId("5ac8df8efeae4c1cfd56301b"),"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3da"),"datum_izvajanja":1.523115244047e+12,"opombe":{"required":false},"ucitelji":[ObjectId("5ac8daee119e6a1c2ab5b25e"),ObjectId("5ac8daee119e6a1c2ab5b25f")],"polagalci":[ObjectId("5ac8ca4d36fba41313122306")],"veljavnost":true},
{"_id":ObjectId("5ac8e4fb4d6b0b20b65b9574"),"predmet":ObjectId("5ac8df8efeae4c1cfd56301c"),"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3da"),"datum_izvajanja":1.523115244047e+12,"opombe":{"required":false},"ucitelji":[ObjectId("5ac8daee119e6a1c2ab5b25f"),ObjectId("5ac8daee119e6a1c2ab5b25e")],"polagalci":[ObjectId("5ac8ca4d36fba41313122308"),ObjectId("5ac8ca4d36fba41313122307")],"veljavnost":true},
    ],
    
    studenti: [
{ "_id": ObjectId("5ac8ca4d36fba41313122306"), "vpisna_stevilka": "63140150", "priimek": "Makovec", "ime": "Armin", "datum_rojstva": "31/03/1995", "kraj_rojstva": "Šempeter pri Gorici", "drzava_rojstva": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "obcina_rojstva": "Nova Gorica", "drzavljanstvo": "Slovensko", "spol": "M", "emso": "3103995500072", "davcna_stevilka": "123456789", "email": "am4531@student.uni-lj.si", "prenosni_telefon": "(0)51 492 392", "stalno_bivalisce_naslov": "Med trtami 7", "stalno_bivalisce_posta": ObjectId("5ac3b84dca0b200e0043d0fa"), "stalno_bivalisce_obcina": ObjectId("5ac3ac7ccaf7bd0bdada63c7"), "stalno_bivalisce_drzava": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "stalno_bivalisce_vrocanje": true, "zacasno_bivalisce_naslov": "kar nekaj nekje 123", "zacasno_bivalisce_posta": ObjectId("5ac3b84dca0b200e0043d0fa"), "zacasno_bivalisce_obcina": ObjectId("5ac3ac7ccaf7bd0bdada63c7"), "zacasno_bivalisce_drzava": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "zacasno_bivalisce_vrocanje": false },
{ "_id": ObjectId("5ac8ca4d36fba41313122307"), "vpisna_stevilka": "63140151", "priimek": "Cevokam", "ime": "Nimra", "datum_rojstva": "13/03/1994", "kraj_rojstva": "Šempeter pri Gorici", "drzava_rojstva": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "obcina_rojstva": "Nova Gorica", "drzavljanstvo": "Slovensko", "spol": "M", "emso": "1303994500072", "davcna_stevilka": "123456788", "email": "cn4530@student.uni-lj.si", "prenosni_telefon": "(0)51 492 392", "stalno_bivalisce_naslov": "Med trtami 5", "stalno_bivalisce_posta": ObjectId("5ac3b84dca0b200e0043d0fa"), "stalno_bivalisce_obcina": ObjectId("5ac3ac7ccaf7bd0bdada63c7"), "stalno_bivalisce_drzava": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "stalno_bivalisce_vrocanje": true, "zacasno_bivalisce_naslov": "kar nekaj nekje 3", "zacasno_bivalisce_posta": ObjectId("5ac3b84dca0b200e0043d0fa"), "zacasno_bivalisce_obcina": ObjectId("5ac3ac7ccaf7bd0bdada63c7"), "zacasno_bivalisce_drzava": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "zacasno_bivalisce_vrocanje": false },
{ "_id": ObjectId("5ac8ca4d36fba41313122308"), "vpisna_stevilka": "63140152", "priimek": "Kajtebrigovič", "ime": "Nobenkovič", "datum_rojstva": "01/01/1991", "kraj_rojstva": "Šempeter pri Gorici", "drzava_rojstva": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "obcina_rojstva": "Nova Gorica", "drzavljanstvo": "Slovensko", "spol": "M", "emso": "3103995500072", "davcna_stevilka": "123456789", "email": "nb4531@student.uni-lj.si", "prenosni_telefon": "(0)51 492 392", "stalno_bivalisce_naslov": "Med trtami 7", "stalno_bivalisce_posta": ObjectId("5ac3b84dca0b200e0043d0fa"), "stalno_bivalisce_obcina": ObjectId("5ac3ac7ccaf7bd0bdada63c7"), "stalno_bivalisce_drzava": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "stalno_bivalisce_vrocanje": true, "zacasno_bivalisce_naslov": "kar nekaj nekje 123", "zacasno_bivalisce_posta": ObjectId("5ac3b84dca0b200e0043d0fa"), "zacasno_bivalisce_obcina": ObjectId("5ac3ac7ccaf7bd0bdada63bb"), "zacasno_bivalisce_drzava": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "zacasno_bivalisce_vrocanje": false },
{"_id":ObjectId("5aef36672df3d92098c87f96"),"ime":"Klemen","priimek":"Markovič","email":"klemen.markovic@gmail.com","vpisna_stevilka":"63180153","zetoni":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"studijsko_leto_prvega_vpisa_v_ta_program":ObjectId("5ac3c4553f0fb21a058ff3d8"),"letnik":ObjectId("5ac8d21c962f7b1a105fd312"),"studijski_program":ObjectId("5ac8c4739a223311d219b718"),"vrsta_studija":ObjectId("5ac8bb39c3e49f0ee16a8b36"),"vrsta_vpisa":ObjectId("5ac8be2a7482291008d3f9f5"),"nacin_studija":ObjectId("5ac8bef1477ab810cd9647f4"),"_id":ObjectId("5aef36672df3d92098c87f97"),"izkoriscen":false,"prosta_izbira":false,"neopravljeni_predmeti":[]}],"studijska_leta_studenta":[],"datum_registracije":Date("2018-05-06T17:07:51.869Z"),"__v":1,"datum_rojstva":"14.5.1994","drzava_rojstva":ObjectId("5ac3bbb5eeafcf0f08c3a5b4"),"prenosni_telefon":"051 492 392"},
{"_id":ObjectId("5aef49a79958d4255801a970"),"ime":"Vpisan","priimek":"VPrviLetnik","datum_rojstva": "31/03/1995","kraj_rojstva": "Šempeter pri Gorici", "drzava_rojstva": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "obcina_rojstva": "Nova Gorica", "drzavljanstvo": "Slovensko", "spol": "M", "emso": "3103995500072", "davcna_stevilka": "123456789", "email": "am4531@student.uni-lj.si", "prenosni_telefon": "(0)51 492 392", "stalno_bivalisce_naslov": "Med trtami 7", "stalno_bivalisce_posta": ObjectId("5ac3b84dca0b200e0043d0fa"), "stalno_bivalisce_obcina": ObjectId("5ac3ac7ccaf7bd0bdada63c7"), "stalno_bivalisce_drzava": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "stalno_bivalisce_vrocanje": true, "zacasno_bivalisce_naslov": "kar nekaj nekje 123", "zacasno_bivalisce_posta": ObjectId("5ac3b84dca0b200e0043d0fa"), "zacasno_bivalisce_obcina": ObjectId("5ac3ac7ccaf7bd0bdada63c7"), "zacasno_bivalisce_drzava": ObjectId("5ac3bbb5eeafcf0f08c3a5b1"), "zacasno_bivalisce_vrocanje": false,"email":"vpisan.v.prvi.letnik@gmail.com","vpisna_stevilka":"63180154","__v":1,"zetoni":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"letnik":ObjectId("5ac8d21c962f7b1a105fd312"),"studijski_program":ObjectId("5ac8c4739a223311d219b718"),"studijsko_leto_prvega_vpisa_v_ta_program":ObjectId("5ac3c4553f0fb21a058ff3d8"),"vrsta_studija":ObjectId("5ac8bb39c3e49f0ee16a8b36"),"vrsta_vpisa":ObjectId("5ac8be2a7482291008d3f9f5"),"nacin_studija":ObjectId("5ac8bef1477ab810cd9647f4"),"_id":ObjectId("5aef49a79958d4255801a971"),"izkoriscen":true,"prosta_izbira":false,"neopravljeni_predmeti":[]}],"studijska_leta_studenta":[{"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"letnik":ObjectId("5ac8d21c962f7b1a105fd312"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7b9"),"opravil":false,"predmeti":[{"predmet":ObjectId("5ac8df8efeae4c1cfd56301b"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7c3")},{"predmet":ObjectId("5ac8df8efeae4c1cfd56301c"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7c2")},{"predmet":ObjectId("5ac8df8efeae4c1cfd56301d"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7c1")},{"predmet":ObjectId("5ac8df8efeae4c1cfd56301e"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7c0")},{"predmet":ObjectId("5ac8df8efeae4c1cfd56301f"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7bf")},{"predmet":ObjectId("5ac8df8efeae4c1cfd563020"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7be")},{"predmet":ObjectId("5ac8df8efeae4c1cfd563021"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7bd")},{"predmet":ObjectId("5ac8df8efeae4c1cfd563023"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7bc")},{"predmet":ObjectId("5ac8df8efeae4c1cfd563024"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7bb")},{"predmet":ObjectId("5ac8df8efeae4c1cfd563025"),"_id":ObjectId("5aef4b5f9dcb4b268c0cd7ba")}]}],"datum_registracije":Date("2018-05-06T18:33:41.000Z")},
    ],
    vpisi: [
{"_id":ObjectId("5aef4b459dcb4b268c0cd7b8"),"student":ObjectId("5aef49a79958d4255801a970"),"studijsko_leto":ObjectId("5ac3c4553f0fb21a058ff3d8"),"letnik":ObjectId("5ac8d21c962f7b1a105fd312"),"studijski_program":ObjectId("5ac8c4739a223311d219b718"),"vrsta_studija":ObjectId("5ac8bb39c3e49f0ee16a8b36"),"vrsta_vpisa":ObjectId("5ac8be2a7482291008d3f9f5"),"nacin_studija":ObjectId("5ac8bef1477ab810cd9647f4"),"studijsko_leto_prvega_vpisa_v_ta_program":ObjectId("5ac3c4553f0fb21a058ff3d8"),"kraj_izvajanja":"Ljubljana","obvezniPredmeti":[ObjectId("5ac8df8efeae4c1cfd56301b"),ObjectId("5ac8df8efeae4c1cfd56301c"),ObjectId("5ac8df8efeae4c1cfd56301d"),ObjectId("5ac8df8efeae4c1cfd56301e"),ObjectId("5ac8df8efeae4c1cfd56301f"),ObjectId("5ac8df8efeae4c1cfd563020"),ObjectId("5ac8df8efeae4c1cfd563021"),ObjectId("5ac8df8efeae4c1cfd563023"),ObjectId("5ac8df8efeae4c1cfd563024"),ObjectId("5ac8df8efeae4c1cfd563025")],"strokovniIzbirniPredmeti":[],"splosniIzbirniPredmeti":[],"moduli":[],"modulniPredmeti":[],"predmeti":[ObjectId("5ac8df8efeae4c1cfd56301b"),ObjectId("5ac8df8efeae4c1cfd56301c"),ObjectId("5ac8df8efeae4c1cfd56301d"),ObjectId("5ac8df8efeae4c1cfd56301e"),ObjectId("5ac8df8efeae4c1cfd56301f"),ObjectId("5ac8df8efeae4c1cfd563020"),ObjectId("5ac8df8efeae4c1cfd563021"),ObjectId("5ac8df8efeae4c1cfd563023"),ObjectId("5ac8df8efeae4c1cfd563024"),ObjectId("5ac8df8efeae4c1cfd563025")],"vpisan":Date("2018-05-06T18:37:11.419Z"),"potrjen":true,"valid":true,"priloge":[],"prosta_izbira":false,"__v":2},
    ],
    
    userji: [
{"_id":ObjectId("5ac8fb5a62edab3a6c5b69ab"),student: ObjectId("5ac8ca4d36fba41313122306"),email: "am4531@student.uni-lj.si",password: "qwas123"},
{"_id":ObjectId("5ac8fb5a62edab3a6c5b69ac"),student: ObjectId("5ac8ca4d36fba41313122307"),email: "cn4530@student.uni-lj.si",password: "qwas123"},
{"_id":ObjectId("5ac8fb5a62edab3a6c5b69ad"),student: ObjectId("5ac8ca4d36fba41313122308"),email: "nb4531@student.uni-lj.si",password: "qwas123"},
{"_id":ObjectId("5ac8fb5a62edab3a6c5b69ae"),zaposlen: ObjectId("5ac8daee119e6a1c2ab5b25e"),email: "test@test.test",password: "qwas123", skrbnik: true},
{"_id":ObjectId("5ac8fb5a62edab3a6c5b69af"),zaposlen: ObjectId("5ac8daee119e6a1c2ab5b25f"),email: "test2@test.test",password: "qwas123"},
{"_id":ObjectId("5aef36672df3d92098c87f98"),password:"qwas123","student":ObjectId("5aef36672df3d92098c87f96"),"email":"km0000@student.uni-lj.si","valid":true,"skrbnik":false,"__v":0},
{"_id":ObjectId("5aef49a79958d4255801a972"),"password":"qwas123","student":ObjectId("5aef49a79958d4255801a970"),"opombe":"m9UYc08kNmQl","email":"vv0000@student.uni-lj.si","valid":true,"skrbnik":false,"__v":0},
    ]
};
var models = {
    Obcina: mongoose.model('Obcina'),
    Drzava: mongoose.model('Drzava'),
    Posta: mongoose.model('Posta'),
    
    StudijskoLeto: mongoose.model('StudijskoLeto'),
    
    VrstaStudija: mongoose.model('VrstaStudija'),
    VrstaVpisa: mongoose.model('VrstaVpisa'),
    OblikaStudija: mongoose.model('OblikaStudija'),
    NacinStudija: mongoose.model('NacinStudija'),
    
    StudijskiProgram: mongoose.model('StudijskiProgram'),
    Letnik: mongoose.model('Letnik'),
    
    Zaposlen: mongoose.model('Zaposlen'),
    
    Predmet: mongoose.model('Predmet'),
    DelPredmetnika: mongoose.model('DelPredmetnika'),
    Predmetnik: mongoose.model('Predmetnik'),
    Izpit: mongoose.model('Izpit'),
    
    Student: mongoose.model('Student'),
    Vpis: mongoose.model('Vpis'),
    
    User: mongoose.model('User')
};

/* Public functions */
module.exports.vnosZacetnihPodatkov = function(req, res) {
    zacniVnasanjeZacetnihPodatkov(req, res, [
        dropDB,
        
        vnosObcin, vnosDrzav, vnosPost,
        
        vnosStudijskihLet,
        
        vnosVrsteStudijev, vnosVrsteVpisev, vnosOblikStudijev, vnosNacinovStudija,
        
        vnosStudijskihProgramov, vnosLetnikov,
        
        vnosZaposlenih,
        
        vnosPredmetov, vnosDelovPredmetnika, vnosPredmetnikov, vnosIzpitov,
        
        vnosStudentov, vnosVpisov,
        
        vnosUserjev,
        
        vnosDone
    ]);
};
module.exports.izbrisBaze = function(req, res) {
    dropDB(req, res, [ dropDB, dropDone ]);
};


/* Private functions */
function dropDB(req, res, next) {
    console.log("Dropping DB...");
    mongoose.connection.db.dropDatabase(function (err) {
        if(err) {
            //console.log(err);
            return res.status(403).send({ message: "Encountered error while dropping database" });
        }
        
        callNext(req, res, next);
    });
}

function zacniVnasanjeZacetnihPodatkov(req, res, next) {
    console.log("Začenjam vnos začetnih podatkov v DB...");
    
    callNext(req, res, next);
}
function vnosDone(req, res) {
    console.log("DB populated!");
    res.status(201).json({
        message: "DB populated"
    });
}
function dropDone(req, res) {
    console.log("DB dropped!");
    res.status(204).json({
        message: "DB dropped"
    });
}

function vnosObcin(req, res, next) {
    console.log("Vnašam občine...");
    
    models.Obcina.create(zacetniPodatki.obcine, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Občin - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Občine vnešene!");
        callNext(req, res, next);
    });
}
function vnosDrzav(req, res, next) {
    console.log("Vnašam države...");
    
    models.Drzava.create(zacetniPodatki.drzave, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Držav - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Države vnešene!");
        callNext(req, res, next);
    });
}
function vnosPost(req, res, next) {
    console.log("Vnašam pošte...");
    
    models.Posta.create(zacetniPodatki.poste, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Pošt - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Pošte vnešene!");
        callNext(req, res, next);
    });
}

function vnosStudijskihLet(req, res, next) {
    console.log("Vnašam študijska leta...");
    
    models.StudijskoLeto.create(zacetniPodatki.studijskaLeta, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Študijskih let - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Študijska leta vnešena!");
        callNext(req, res, next);
    });
}

function vnosVrsteStudijev(req, res, next) {
    console.log("Vnašam vrste študijev...");
    
    models.VrstaStudija.create(zacetniPodatki.vrsteStudija, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Vrst Študijev - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Vrste študijev vnešene!");
        callNext(req, res, next);
    });
}
function vnosVrsteVpisev(req, res, next) {
    console.log("Vnašam vrste vpisov...");
    
    models.VrstaVpisa.create(zacetniPodatki.vrsteVpisev, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Vrst Vpisov - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Vrste vpisov vnešene!");
        callNext(req, res, next);
    });
}
function vnosOblikStudijev(req, res, next) {
    console.log("Vnašam oblike študija...");
    
    models.OblikaStudija.create(zacetniPodatki.oblikeStudija, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Oblik Študija - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Oblike študija vnešene!");
        callNext(req, res, next);
    });
}
function vnosNacinovStudija(req, res, next) {
    console.log("Vnašam načine študija...");
    
    models.NacinStudija.create(zacetniPodatki.naciniStudija, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Načinov Študija - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Načini študija vnešeni!");
        callNext(req, res, next);
    });
}

function vnosStudijskihProgramov(req, res, next) {
    console.log("Vnašam študijske programe...");
    
    models.StudijskiProgram.create(zacetniPodatki.studijskiProgrami, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Študijskih Programov - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Študijski programi vnešeni!");
        callNext(req, res, next);
    });
}
function vnosLetnikov(req, res, next) {
    console.log("Vnašam letnike...");
    
    models.Letnik.create(zacetniPodatki.letniki, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Letnikov - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Letniki vnešeni!");
        callNext(req, res, next);
    });
}

function vnosZaposlenih(req, res, next) {
    console.log("Vnašam zaposlene...");
    
    models.Zaposlen.create(zacetniPodatki.zaposleni, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Zaposlenih - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Zaposleni vnešeni!");
        callNext(req, res, next);
    });
}

function vnosPredmetov(req, res, next) {
    console.log("Vnašam predmete...");
    
    models.Predmet.create(zacetniPodatki.predmeti, function(err, data) {
        if(err) {
            console.log(err);
            return res.status(409).send({ message: "Napaka pri vnosu predmetov - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Predmeti vnešeni!");
        callNext(req, res, next);
    });
}
function vnosDelovPredmetnika(req, res, next) {
    console.log("Vnašam dele predmetnika...");
    
    models.DelPredmetnika.create(zacetniPodatki.deliPredmetnika, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu delov predmetnika - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Deli predmetnika vnešeni!");
        callNext(req, res, next);
    });
}
function vnosPredmetnikov(req, res, next) {
    console.log("Vnašam predmetnike...");
    
    models.Predmetnik.create(zacetniPodatki.predmetniki, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu predmetnikov - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Predmetniki vnešeni!");
        callNext(req, res, next);
    });
}
function vnosIzpitov(req, res, next) {
    console.log("Vnašam izpite...");
    
    models.Izpit.collection.insert(zacetniPodatki.izpiti, function(err, data) {
        if(err) {
            console.log(err);
            return res.status(409).send({ message: "Napaka pri vnosu izpitov - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Izpiti vnešeni!");
        callNext(req, res, next);
    });
}

function vnosStudentov(req, res, next) {
    console.log("Vnašam študente...");
    
    models.Student.create(zacetniPodatki.studenti, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu Študentov - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Študenti vnešeni!");
        callNext(req, res, next);
    });
}
function vnosVpisov(req, res, next) {
    console.log("Vnašam vpise...");
    
    models.Vpis.create(zacetniPodatki.vpisi, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu vpisov - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Vpisi vnešeni!");
        callNext(req, res, next);
    });
}

function vnosUserjev(req, res, next) {
    console.log("Vnašam userje...");
    
    models.User.create(zacetniPodatki.userji, function(err, data) {
        if(err) {
            return res.status(409).send({ message: "Napaka pri vnosu userjev - Si spraznil bazo pred izvedbo klica?" });
        }
        
        console.log("Userji vnešeni!");
        callNext(req, res, next);
    });
}