export const venues = [
 ['store-vega','Store VEGA','Vesterbro','Enghavevej 40','https://vega.dk/kalender'],['lille-vega','Lille VEGA','Vesterbro','Enghavevej 40','https://vega.dk/kalender'],['pumpehuset','Pumpehuset','Indre By','Studiestræde 52','https://pumpehuset.dk/koncerter/'],['loppen','Loppen','Christianshavn','Sydområdet 4B','https://loppen.dk/kalender/'],['koncerthuset','DR Koncerthuset','Ørestad','Ørestads Boulevard 13','https://www.drkoncerthuset.dk/kalender/'],['graa-hal','Den Grå Hal','Christiania','Refshalevej 2','https://www.dengraahal.dk/'],['hotel-cecil','Hotel Cecil','Indre By','Niels Hemmingsens Gade 10','https://hotelcecil.dk/'],['bremen','Bremen Teater','Indre By','Nyropsgade 39-41','https://www.brementeater.dk/'],['poolen','Poolen','Refshaleøen','Refshalevej 189','https://poolen.dk/'],['rust','Rust','Nørrebro','Guldbergsgade 8','https://rust.dk/']
].map(([id,name,area,address,url])=>({id,name,area,address,url}));
const raw=`2026-08-17|Soulfly|lille-vega|metal
2026-08-18|Kurt Vile & The Violators|store-vega|indie/rock
2026-08-27|Mina Okabe|store-vega|pop
2026-08-28|When Saints Go Machine|graa-hal|elektronisk
2026-09-02|Love Shop|store-vega|rock
2026-09-03|Blaue Blume|pumpehuset|alternativ pop
2026-09-04|Guldimund|koncerthuset|pop
2026-09-05|Athina|rust|r&b
2026-09-09|Fear Factory|lille-vega|metal
2026-09-10|6LACK|store-vega|r&b
2026-09-12|Smøgmænd|store-vega|hiphop
2026-09-16|Oliver Tree|store-vega|alternativ pop
2026-09-17|Chinese American Bear|lille-vega|indie
2026-09-18|Kayak|store-vega|progrock
2026-09-19|Current 93|store-vega|eksperimenterende
2026-09-23|Donny Benét|store-vega|disco
2026-09-26|Lake Street Dive|store-vega|soul/pop
2026-09-27|The Amity Affliction|lille-vega|metalcore
2026-10-01|Yör|store-vega|indiepop
2026-10-02|shinyhunt|lille-vega|alternativ
2026-10-04|Fimiguerrero|lille-vega|hiphop
2026-10-07|The Deep Dark Woods|lille-vega|folk
2026-10-09|Icekiid|store-vega|hiphop
2026-10-11|Cat Power|store-vega|indie
2026-10-13|Eve|store-vega|hiphop
2026-10-16|MØL|lille-vega|metal
2026-10-21|Oranssi Pazuzu|lille-vega|metal
2026-10-22|Slayyyter|store-vega|pop
2026-10-28|Alex Vargas|store-vega|pop
2026-11-03|Stephen Wilson Jr.|store-vega|country
2026-11-06|Jembaa Groove|lille-vega|afrobeat
2026-11-08|Rita Payés|store-vega|jazz
2026-11-12|URO|store-vega|pop
2026-11-13|Mikael Simpson|store-vega|elektronisk
2026-11-17|Archspire|lille-vega|metal
2026-11-21|Junkyard Drive|lille-vega|rock
2026-11-28|Carpark North|store-vega|rock
2026-12-01|Artemas|store-vega|pop
2026-12-05|ROYA|store-vega|pop
2026-12-18|The Ocean|lille-vega|metal`;
export const concerts=raw.split('\n').map((x,i)=>{const [date,artist,venueId,genre]=x.split('|');return{id:String(i+1),date,artist,venueId,genre,price:null,url:venueId.includes('vega')?`https://vega.dk/kalender`:venues.find(v=>v.id===venueId)?.url}});
export const venueById=id=>venues.find(v=>v.id===id);
