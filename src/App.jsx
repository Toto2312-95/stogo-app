
import React, { useState } from "react";
import {
  BadgeCheck, Bike, CalendarDays, Camera, CheckCircle2, ChevronLeft, ChevronRight,
  Clock3, Filter, Heart, Home, MapPin, MessageCircle, Phone, PlusCircle, Search,
  ShieldCheck, ShoppingBag, Star, User, Wrench, Flag, Ban, Trash2, Bell, Image
} from "lucide-react";

const vehicleDatabase = {
  Motor: {
    Yamaha: ["MT-03", "MT-07", "MT-09", "MT-10", "YZF-R125", "YZF-R3", "YZF-R7", "YZF-R1", "Ténéré 700", "Tracer 7", "Tracer 9", "XSR700", "XSR900"],
    Honda: ["CB125R", "CB500F", "CB650R", "CB750 Hornet", "CB1000R", "CBR500R", "CBR650R", "Africa Twin", "Transalp XL750", "NC750X", "Rebel 500"],
    Kawasaki: ["Z125", "Z400", "Z500", "Z650", "Z900", "Ninja 400", "Ninja 500", "Ninja 650", "Ninja ZX-6R", "Versys 650", "Vulcan S"],
    Suzuki: ["GSX-S125", "GSX-S950", "GSX-S1000", "GSX-8S", "GSX-8R", "GSX-R125", "V-Strom 650", "V-Strom 800DE", "Hayabusa", "SV650"],
    KTM: ["125 Duke", "390 Duke", "690 SMC R", "790 Duke", "890 Duke R", "1290 Super Duke R", "390 Adventure", "790 Adventure", "890 Adventure"],
    BMW: ["G 310 R", "G 310 GS", "F 800 GS", "F 900 R", "F 900 XR", "R 1250 GS", "R 1300 GS", "S 1000 R", "S 1000 RR"],
    Ducati: ["Monster", "SuperSport 950", "Panigale V2", "Panigale V4", "Streetfighter V2", "Multistrada V4", "DesertX", "Diavel V4"],
    Triumph: ["Trident 660", "Street Triple 765", "Speed Triple 1200", "Tiger Sport 660", "Tiger 900", "Tiger 1200", "Bonneville T100"],
  },
  Quad: {
    Yamaha: ["Raptor 700", "YFZ450R", "Kodiak 450", "Kodiak 700", "Grizzly 700"],
    Polaris: ["Sportsman 450", "Sportsman 570", "Sportsman 850", "Sportsman XP 1000", "Scrambler 850", "RZR XP 1000", "Ranger XP 1000"],
    "Can-Am": ["Outlander 450", "Outlander 570", "Outlander 650", "Outlander 850", "Renegade 570", "Renegade 1000R", "Maverick X3"],
    Honda: ["TRX250X", "TRX420 FourTrax Rancher", "TRX520 Foreman", "TRX520 Rubicon"],
    Kawasaki: ["KFX90", "KFX450R", "Brute Force 300", "Brute Force 750", "Teryx", "Mule Pro"],
    Suzuki: ["QuadSport Z90", "QuadSport Z400", "KingQuad 400", "KingQuad 500", "KingQuad 750"],
    Kymco: ["MXU 300", "MXU 465", "MXU 550", "MXU 700", "Maxxer 300", "Maxxer 450"],
    CFMOTO: ["CFORCE 450", "CFORCE 520", "CFORCE 625", "CFORCE 850", "CFORCE 1000", "ZFORCE 950", "UFORCE 1000"],
  },
  Scooter: {
    Yamaha: ["NMAX 125", "NMAX 155", "XMAX 125", "XMAX 300", "TMAX 560"],
    Honda: ["PCX125", "SH125i", "SH350i", "Forza 125", "Forza 350", "ADV350"],
    Vespa: ["Primavera 50", "Primavera 125", "Sprint 50", "Sprint 125", "GTS 125", "GTS 300"],
    Piaggio: ["Liberty 50", "Liberty 125", "Medley 125", "Beverly 300", "MP3 400"],
    Peugeot: ["Kisbee 50", "Tweet 125", "Django 125", "Pulsion 125", "Metropolis 400"],
  },
  Onderdeel: {
    Universeel: ["Banden", "Remblokken", "Remschijven", "Uitlaat", "Kettingkit", "Accu", "Olie", "Luchtfilter", "Bougie", "Spiegels"],
    Yamaha: ["Yamaha originele onderdelen", "Raptor onderdelen", "MT onderdelen", "YZF onderdelen"],
    Honda: ["Honda originele onderdelen", "CB onderdelen", "CBR onderdelen", "TRX onderdelen"],
    Polaris: ["Polaris originele onderdelen", "Sportsman onderdelen", "RZR onderdelen", "Ranger onderdelen"],
    "Can-Am": ["Can-Am originele onderdelen", "Outlander onderdelen", "Renegade onderdelen", "Maverick onderdelen"],
  },
};

const garages = [
  { name: "MotoCare Antwerpen", distance: "2,4 km", rating: 4.8, reviews: 126, type: "Motor + Quad", badges: ["Verified", "Yamaha", "Quad expert"], available: "Vandaag 16:30", price: "€€", match: 96, services: ["Onderhoud", "Banden", "Diagnose", "Quad reparatie"] },
  { name: "ATV Service Kempen", distance: "8,7 km", rating: 4.6, reviews: 84, type: "Quad specialist", badges: ["Verified", "Polaris", "Off-road"], available: "Morgen 10:00", price: "€€", match: 91, services: ["Off-road", "Elektrisch", "Onderhoud", "ATV tuning"] },
];

const listings = [
  { title: "Yamaha Raptor 700", type: "Quad", price: "€7.950", year: "2021", km: "3.200 km", location: "Antwerpen", seller: "Verified rider", rating: 4.9, tags: ["Onderhoudshistoriek", "Niet ongeval", "Quad"] },
  { title: "Honda CB650R", type: "Motor", price: "€6.400", year: "2020", km: "12.800 km", location: "Mechelen", seller: "Particulier", rating: 4.7, tags: ["ABS", "Dealer onderhoud", "Motor"] },
];

const initialPosts = [
  {
    id: 1,
    owner: "Jij",
    title: "Ritje door de Kempen",
    vehicle: "Yamaha Raptor 700",
    location: "Turnhout",
    likes: 42,
    comments: [
      { id: 1, user: "Tom", text: "Zalig beeld! Welke route was dit?", status: "visible" },
      { id: 2, user: "OngewensteUser", text: "Ongepaste reactie voorbeeld", status: "visible" },
    ],
  },
  {
    id: 2,
    owner: "Lena",
    title: "Nieuwe banden getest",
    vehicle: "Honda CB650R",
    location: "Antwerpen",
    likes: 27,
    comments: [{ id: 3, user: "Mika", text: "Ziet er goed uit!", status: "visible" }],
  },
];

const tabs = ["Start", "Dashboard", "Activiteit", "Kaart", "Garage", "Afspraak", "Reviews", "Marktplaats", "Verkopen", "Advertentie", "Support", "Admin", "Geblokkeerd"];

function cn(...classes) { return classes.filter(Boolean).join(" "); }

function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = variant === "secondary" ? "border border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-100" : variant === "danger" ? "bg-red-600 text-white hover:bg-red-700" : "bg-neutral-950 text-white hover:bg-neutral-800";
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition active:scale-[0.98]", styles, className)} {...props}>{children}</button>;
}

function Card({ children, className = "" }) { return <div className={cn("rounded-3xl border border-neutral-200 bg-white shadow-sm", className)}>{children}</div>; }

function SelectField({ label, value, options, onChange }) {
  return <label className="block"><span className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold outline-none">{options.map((option) => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}</select></label>;
}

function InputField({ label, value, placeholder, onChange }) {
  return <label className="block"><span className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</span><input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold outline-none" /></label>;
}

function PhoneFrame({ children, title, subtitle, setScreen, backTo }) {
  return (
    <div className="w-[360px] rounded-[2.25rem] border bg-neutral-950 p-3 shadow-2xl">
      <div className="relative min-h-[720px] overflow-hidden rounded-[1.85rem] bg-neutral-50">
        <div className="bg-neutral-950 px-5 pb-5 pt-4 text-white">
          <div className="mb-4 flex items-center justify-between">
            {backTo ? <button onClick={() => setScreen(backTo)} className="rounded-full bg-white/10 p-2"><ChevronLeft size={18} /></button> : <div className="rounded-full bg-white/10 px-3 py-1 text-xs">MVP</div>}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><User size={18} /></div>
          </div>
          <p className="text-xs font-medium text-neutral-300">MotoHub</p>
          <h2 className="mt-1 text-xl font-bold">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-neutral-300">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

function TopTabs({ screen, setScreen }) {
  return <div className="mx-auto mb-8 flex max-w-5xl flex-wrap justify-center gap-2">{tabs.map((item) => <button key={item} onClick={() => setScreen(item)} className={cn("rounded-full px-4 py-2 text-sm font-semibold transition", screen === item ? "bg-neutral-950 text-white" : "border bg-white text-neutral-700 hover:bg-neutral-100")}>{item}</button>)}</div>;
}

function BottomNav({ active, setScreen }) {
  const items = [["Dashboard", Home], ["Activiteit", Image], ["Marktplaats", ShoppingBag], ["Support", MessageCircle]];
  return <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 gap-1 border-t bg-white px-3 py-2">{items.map(([label, Icon]) => <button key={label} onClick={() => setScreen(label)} className={cn("flex flex-col items-center gap-1 rounded-xl py-1 text-[11px]", active === label ? "font-bold text-neutral-950" : "text-neutral-500")}><Icon size={18} /><span>{label}</span></button>)}</div>;
}

function TrustBar() {
  return <div className="grid grid-cols-3 gap-2">{[["Verified", ShieldCheck], ["Echte rijders", BadgeCheck], ["Recente reviews", Clock3]].map(([label, Icon]) => <div key={label} className="rounded-2xl bg-neutral-100 p-3 text-center"><Icon className="mx-auto mb-1" size={18} /><p className="text-[11px] font-semibold">{label}</p></div>)}</div>;
}

function Start({ setScreen }) {
  return <PhoneFrame title="Alles voor motor & quad" subtitle="Info, onderhoud, verkoop, foto’s en betrouwbare herstellers." setScreen={setScreen}><div className="space-y-5 p-5 pb-24"><div className="rounded-[2rem] bg-gradient-to-br from-neutral-900 to-neutral-600 p-5 text-white"><Bike size={58} /><h1 className="mt-5 text-2xl font-bold leading-tight">Vind hulp, deel foto’s, koop of verkoop</h1><p className="mt-2 text-sm text-neutral-200">Eén plaats voor motoren, quads, recente activiteiten en veilige community-moderatie.</p></div><Card><div className="space-y-3 p-4"><p className="text-sm font-bold">Kies je voertuigtype</p><div className="grid grid-cols-2 gap-3"><button className="rounded-2xl bg-neutral-950 p-4 text-left text-white"><Bike className="mb-3" /><span className="font-semibold">Motor</span></button><button className="rounded-2xl border bg-white p-4 text-left"><Wrench className="mb-3" /><span className="font-semibold">Quad</span></button></div></div></Card><Button className="w-full" onClick={() => setScreen("Dashboard")}>Start prototype <ChevronRight size={17} /></Button></div></PhoneFrame>;
}

function Action({ icon, label, note, onClick }) {
  return <button onClick={onClick} className="text-left"><Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md"><div className="p-4"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100">{icon}</div><p className="font-bold">{label}</p><p className="mt-1 text-xs text-neutral-500">{note}</p></div></Card></button>;
}

function Dashboard({ setScreen }) {
  return <PhoneFrame title="Dashboard" subtitle="Yamaha Raptor 700 · actief profiel" setScreen={setScreen}><div className="relative min-h-[600px] space-y-4 p-4 pb-24"><Card className="bg-neutral-950 text-white"><div className="p-5"><p className="text-sm text-neutral-300">Volgend onderhoud</p><div className="mt-2 flex items-end justify-between"><div><h3 className="text-3xl font-bold">420 km</h3><p className="mt-1 text-sm text-neutral-300">Olie + algemene check aanbevolen</p></div><Wrench size={34} /></div></div></Card><div className="grid grid-cols-2 gap-3"><Action icon={<Image />} label="Activiteit" note="Foto’s delen" onClick={() => setScreen("Activiteit")} /><Action icon={<ShoppingBag />} label="Marktplaats" note="Koop & verkoop" onClick={() => setScreen("Marktplaats")} /><Action icon={<MapPin />} label="Hersteller" note="Beste match" onClick={() => setScreen("Kaart")} /><Action icon={<PlusCircle />} label="Verkopen" note="Advertentie maken" onClick={() => setScreen("Verkopen")} /></div><Card><button onClick={() => setScreen("Admin")} className="flex w-full items-center justify-between gap-3 p-4 text-left"><div><p className="text-xs font-semibold uppercase text-neutral-500">Admin demo</p><h3 className="font-bold">Moderatie meldingen</h3><p className="text-sm text-neutral-500">Bekijk gemelde reacties direct</p></div><Bell /></button></Card><TrustBar /><BottomNav active="Dashboard" setScreen={setScreen} /></div></PhoneFrame>;
}

function Activity({ setScreen, posts, setPosts, reports, setReports, blockedUsers, setBlockedUsers }) {
  const [notice, setNotice] = useState("");

  function removeComment(postId, commentId) {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: post.comments.map(c => c.id === commentId ? { ...c, status: "deleted" } : c) } : post));
    setNotice("Reactie verwijderd door eigenaar van de foto.");
  }

  function reportComment(post, comment) {
    const report = {
      id: Date.now(),
      postTitle: post.title,
      reportedUser: comment.user,
      commentText: comment.text,
      reason: "Ongewenste reactie op foto",
      status: "Nieuw",
      time: "Zojuist",
    };
    setReports([report, ...reports]);
    setNotice("Reactie aangegeven. Admin ziet deze melding direct.");
  }

  function blockUser(user) {
    if (!blockedUsers.includes(user)) setBlockedUsers([user, ...blockedUsers]);
    setNotice(`${user} is geblokkeerd voor jouw foto’s.`);
  }

  return (
    <PhoneFrame title="Activiteit" subtitle="Deel foto’s van recente ritten en projecten." setScreen={setScreen} backTo="Dashboard">
      <div className="relative min-h-[600px] space-y-4 p-4 pb-24">
        {notice && <Card className="border-neutral-950"><div className="flex gap-2 p-3 text-sm font-semibold"><CheckCircle2 size={18} />{notice}</div></Card>}

        <Button className="w-full"><Camera size={17} /> Foto delen</Button>

        {posts.map((post) => (
          <Card key={post.id}>
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{post.owner}</p>
                  <p className="text-xs text-neutral-500">{post.vehicle} · {post.location}</p>
                </div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold">Recent</span>
              </div>

              <div className="flex h-44 items-center justify-center rounded-[2rem] bg-neutral-200">
                <Camera size={48} />
              </div>

              <div>
                <h3 className="font-black">{post.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">❤️ {post.likes} likes · {post.comments.filter(c => c.status === "visible").length} reacties</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold">Reacties</p>
                {post.comments.map((comment) => (
                  <div key={comment.id} className={cn("rounded-2xl border p-3", comment.status === "deleted" ? "bg-neutral-100 text-neutral-400" : "bg-white")}>
                    {comment.status === "deleted" ? (
                      <p className="text-sm italic">Reactie verwijderd</p>
                    ) : blockedUsers.includes(comment.user) ? (
                      <p className="text-sm italic">Reactie verborgen: gebruiker geblokkeerd</p>
                    ) : (
                      <>
                        <p className="text-sm"><strong>{comment.user}</strong>: {comment.text}</p>
                        {post.owner === "Jij" && (
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            <button onClick={() => removeComment(post.id, comment.id)} className="rounded-xl border px-2 py-2 text-[11px] font-bold"><Trash2 size={13} className="mx-auto mb-1" />Verwijder</button>
                            <button onClick={() => reportComment(post, comment)} className="rounded-xl border px-2 py-2 text-[11px] font-bold"><Flag size={13} className="mx-auto mb-1" />Aangeven</button>
                            <button onClick={() => blockUser(comment.user)} className="rounded-xl border px-2 py-2 text-[11px] font-bold"><Ban size={13} className="mx-auto mb-1" />Blokkeer</button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}

        <BottomNav active="Activiteit" setScreen={setScreen} />
      </div>
    </PhoneFrame>
  );
}

function AdminPanel({ setScreen, reports, blockedUsers }) {
  return (
    <PhoneFrame title="Admin meldingen" subtitle="Nieuwe meldingen verschijnen direct." setScreen={setScreen} backTo="Dashboard">
      <div className="relative min-h-[600px] space-y-4 p-4 pb-24">
        <Card className="bg-neutral-950 text-white">
          <div className="p-4">
            <p className="text-sm text-neutral-300">Moderatie overzicht</p>
            <h3 className="mt-1 text-3xl font-black">{reports.length}</h3>
            <p className="text-sm text-neutral-300">nieuwe melding(en)</p>
          </div>
        </Card>

        {reports.length === 0 ? (
          <Card><div className="p-4 text-sm text-neutral-600">Nog geen meldingen. Ga naar Activiteit en klik bij een reactie op “Aangeven”.</div></Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className="border-red-200">
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-red-600">Nieuwe melding</p>
                  <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-600">{report.status}</span>
                </div>
                <p className="text-sm"><strong>Foto:</strong> {report.postTitle}</p>
                <p className="text-sm"><strong>Gebruiker:</strong> {report.reportedUser}</p>
                <p className="text-sm"><strong>Reactie:</strong> {report.commentText}</p>
                <p className="text-xs text-neutral-500">{report.reason} · {report.time}</p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="secondary">Bekijk case</Button>
                  <Button variant="danger">Beperk account</Button>
                </div>
              </div>
            </Card>
          ))
        )}

        <Card>
          <div className="p-4">
            <p className="font-bold">Geblokkeerde gebruikers</p>
            <p className="mt-1 text-sm text-neutral-600">{blockedUsers.length ? blockedUsers.join(", ") : "Nog geen geblokkeerde gebruikers."}</p>
          </div>
        </Card>
      </div>
    </PhoneFrame>
  );
}

function FilterHeader({ items, active, setActive, placeholder }) {
  return <div className="space-y-3 p-4"><div className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-3 shadow-sm"><Search size={18} /><span className="text-sm text-neutral-500">{placeholder}</span><Filter size={18} className="ml-auto" /></div><div className="flex gap-2 overflow-x-auto pb-1">{items.map((item) => <button key={item} onClick={() => setActive(item)} className={cn("shrink-0 rounded-full border px-3 py-1 text-xs font-semibold", active === item ? "bg-neutral-950 text-white" : "bg-white")}>{item}</button>)}</div></div>;
}

function MapScreen({ setScreen }) {
  const [filter, setFilter] = useState("Dichtbij");
  return <PhoneFrame title="Herstellers nabij jou" subtitle="Gesorteerd op match, afstand en reviews." setScreen={setScreen} backTo="Dashboard"><div className="relative min-h-[600px] pb-24"><FilterHeader items={["Dichtbij", "Quad", "Motor", "Verified"]} active={filter} setActive={setFilter} placeholder="Zoek garage, service of merk..." /><div className="relative mx-4 h-64 overflow-hidden rounded-[2rem] bg-neutral-200"><div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-70">{Array.from({ length: 16 }).map((_, i) => <div key={i} className="border border-neutral-300" />)}</div><button onClick={() => setScreen("Garage")} className="absolute left-16 top-16 rounded-full bg-white p-2 shadow-lg"><MapPin size={22} /></button><div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-white p-3 shadow-lg"><p className="text-xs font-semibold text-neutral-500">Beste match</p><p className="font-bold">MotoCare Antwerpen · 96% match</p></div></div><div className="space-y-3 p-4">{garages.map((garage) => <button key={garage.name} onClick={() => setScreen("Garage")} className="w-full text-left"><Card><div className="p-4"><p className="font-bold">{garage.name}</p><p className="text-sm text-neutral-500">{garage.type} · {garage.distance} · ⭐ {garage.rating}</p></div></Card></button>)}</div><BottomNav active="Kaart" setScreen={setScreen} /></div></PhoneFrame>;
}

function Garage({ setScreen }) {
  const garage = garages[0];
  return <PhoneFrame title="Garage detail" subtitle="Betrouwbare keuze voor jouw quad." setScreen={setScreen} backTo="Kaart"><div className="relative min-h-[600px] space-y-4 p-4 pb-24"><Card className="bg-neutral-950 text-white"><div className="p-5"><p className="text-sm text-neutral-300">{garage.type} · {garage.distance}</p><h1 className="mt-1 text-2xl font-bold">{garage.name}</h1><div className="mt-4 flex flex-wrap gap-2">{garage.badges.map((badge) => <span key={badge} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{badge}</span>)}</div></div></Card><Button className="w-full" onClick={() => setScreen("Afspraak")}>Maak afspraak</Button><Button variant="secondary" className="w-full" onClick={() => setScreen("Reviews")}>Bekijk reviews</Button><BottomNav active="Kaart" setScreen={setScreen} /></div></PhoneFrame>;
}

function Marketplace({ setScreen }) {
  const [filter, setFilter] = useState("Alles");
  return <PhoneFrame title="Marktplaats" subtitle="Koop en verkoop motoren, quads, scooters en onderdelen." setScreen={setScreen} backTo="Dashboard"><div className="relative min-h-[600px] pb-24"><FilterHeader items={["Alles", "Motor", "Quad", "Scooter", "Onderdelen"]} active={filter} setActive={setFilter} placeholder="Zoek merk, model of onderdeel..." /><div className="px-4 pb-3"><Button className="w-full" onClick={() => setScreen("Verkopen")}><PlusCircle size={17} /> Plaats advertentie</Button></div><div className="space-y-3 p-4 pt-0">{listings.map((listing) => <button key={listing.title} onClick={() => setScreen("Advertentie")} className="w-full text-left"><Card><div className="flex gap-3 p-3"><div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-neutral-100"><Bike size={34} /></div><div><p className="font-bold">{listing.title}</p><p className="text-xs text-neutral-500">{listing.year} · {listing.km} · {listing.location}</p><p className="mt-2 text-xl font-black">{listing.price}</p></div></div></Card></button>)}</div><BottomNav active="Marktplaats" setScreen={setScreen} /></div></PhoneFrame>;
}

function SellVehicle({ setScreen }) {
  const [vehicleType, setVehicleType] = useState("Quad");
  const availableBrands = Object.keys(vehicleDatabase[vehicleType]).sort();
  const [brand, setBrandState] = useState("Yamaha");
  const activeBrand = availableBrands.includes(brand) ? brand : availableBrands[0];
  const models = vehicleDatabase[vehicleType][activeBrand] || [];
  const [model, setModelState] = useState("Raptor 700");
  const activeModel = models.includes(model) ? model : models[0];

  function setBrand(nextBrand) { setBrandState(nextBrand); setModelState((vehicleDatabase[vehicleType][nextBrand] || [""])[0]); }
  function setType(nextType) { setVehicleType(nextType); const firstBrand = Object.keys(vehicleDatabase[nextType]).sort()[0]; setBrandState(firstBrand); setModelState(vehicleDatabase[nextType][firstBrand][0]); }

  const [year, setYear] = useState("2021");
  const [condition, setCondition] = useState("Zeer goed");
  const [kilometers, setKilometers] = useState("3200");
  const [price, setPrice] = useState("7950");
  const [location, setLocation] = useState("Antwerpen");

  return <PhoneFrame title="Voertuig verkopen" subtitle="Exacte opties per type, merk en model." setScreen={setScreen} backTo="Marktplaats"><div className="relative min-h-[600px] space-y-4 p-4 pb-24"><Card><div className="space-y-3 p-4"><p className="font-bold">Voertuiggegevens</p><div className="grid grid-cols-2 gap-3"><SelectField label="Type" value={vehicleType} onChange={setType} options={Object.keys(vehicleDatabase)} /><SelectField label="Merk" value={activeBrand} onChange={setBrand} options={availableBrands} /></div><SelectField label="Model" value={activeModel} onChange={setModelState} options={models} /><div className="grid grid-cols-2 gap-3"><SelectField label="Bouwjaar" value={year} onChange={setYear} options={["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2010-2017", "Voor 2010"]} /><InputField label="Km-stand" value={kilometers} onChange={setKilometers} placeholder="bv. 3200" /></div></div></Card><Card><div className="space-y-3 p-4"><p className="font-bold">Verkoopdetails</p><div className="grid grid-cols-2 gap-3"><InputField label="Prijs (€)" value={price} onChange={setPrice} placeholder="bv. 7950" /><InputField label="Locatie" value={location} onChange={setLocation} placeholder="bv. Antwerpen" /></div><SelectField label="Staat" value={condition} onChange={setCondition} options={["Nieuw", "Zeer goed", "Goed", "Gebruikt", "Project / opknapper"]} /></div></Card><Card className="border-neutral-950"><div className="p-4"><p className="text-xs font-semibold uppercase text-neutral-500">Preview advertentie</p><h3 className="mt-1 text-lg font-black">{activeBrand.replaceAll("_", " ")} {activeModel}</h3><p className="text-sm text-neutral-600">{vehicleType} · {year} · {kilometers} km · {condition}</p><p className="mt-2 text-2xl font-black">€{price}</p><p className="text-sm text-neutral-500">{location}</p></div></Card><Button className="w-full" onClick={() => setScreen("Advertentie")}>Advertentie previewen</Button></div></PhoneFrame>;
}

function Appointment({ setScreen }) { return <PhoneFrame title="Afspraak maken" subtitle="Service kiezen" setScreen={setScreen} backTo="Garage"><div className="space-y-4 p-4 pb-24"><Card><div className="p-4"><p className="text-xs font-semibold uppercase text-neutral-500">Garage</p><h3 className="font-bold">MotoCare Antwerpen</h3></div></Card><Button className="w-full" onClick={() => setScreen("Dashboard")}>Afspraak aanvragen</Button></div></PhoneFrame>; }
function Reviews({ setScreen }) { return <PhoneFrame title="Reviews" subtitle="Voertuig-specifieke feedback." setScreen={setScreen} backTo="Garage"><div className="space-y-4 p-4 pb-24"><Card><div className="p-4"><p className="text-sm text-neutral-500">Gemiddelde score</p><div className="mt-1 flex items-end gap-2"><span className="text-5xl font-black">4.8</span><span className="mb-2 text-sm text-neutral-500">/ 5</span></div></div></Card><TrustBar /><Button className="w-full" onClick={() => setScreen("Garage")}>Terug</Button></div></PhoneFrame>; }
function ListingDetail({ setScreen }) { return <PhoneFrame title="Advertentie" subtitle="Veilig kopen of verkopen." setScreen={setScreen} backTo="Marktplaats"><div className="space-y-4 p-4 pb-24"><div className="flex h-48 items-center justify-center rounded-[2rem] bg-neutral-200"><Bike size={72} /></div><Card><div className="p-4"><h3 className="text-2xl font-black">Yamaha Raptor 700</h3><p className="mt-2 text-2xl font-black">€7.950</p><p className="text-sm text-neutral-600">2021 · 3.200 km · Antwerpen</p></div></Card><Button className="w-full"><Phone size={17} /> Contact</Button></div></PhoneFrame>; }
function Support({ setScreen }) { return <PhoneFrame title="Support & hulp" subtitle="Voor account, reacties en verkoopproblemen." setScreen={setScreen} backTo="Dashboard"><div className="relative min-h-[600px] space-y-4 p-4 pb-24"><Card><div className="p-4"><h3 className="font-bold">Waarmee kunnen we helpen?</h3><p className="mt-1 text-sm text-neutral-600">Maak een ticket aan voor account, reactie, garage of verkoop.</p></div></Card><Button className="w-full">Maak support ticket</Button><BottomNav active="Support" setScreen={setScreen} /></div></PhoneFrame>; }
function Blocked({ setScreen }) { return <PhoneFrame title="Account beperkt" subtitle="Je account vraagt extra controle." setScreen={setScreen} backTo="Dashboard"><div className="space-y-4 p-4 pb-24"><Card className="border-red-200 bg-red-50"><div className="p-4"><p className="text-xs font-bold uppercase text-red-600">Actie vereist</p><h3 className="mt-1 text-lg font-bold">Account tijdelijk beperkt</h3></div></Card><Button className="w-full" onClick={() => setScreen("Support")}>Contacteer support</Button></div></PhoneFrame>; }

export default function App() {
  const [screen, setScreen] = useState("Start");
  const [posts, setPosts] = useState(initialPosts);
  const [reports, setReports] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  return (
    <main className="min-h-screen bg-neutral-100 p-4 text-neutral-950 md:p-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-neutral-500">Klikbaar UX-prototype</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">Motor & Quad App</h1>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600">Nu met activiteitentab, foto’s delen en moderatieflow voor ongewenste reacties.</p>
        </div>
        <TopTabs screen={screen} setScreen={setScreen} />
        <div className="flex justify-center">
          {screen === "Start" && <Start setScreen={setScreen} />}
          {screen === "Dashboard" && <Dashboard setScreen={setScreen} />}
          {screen === "Activiteit" && <Activity setScreen={setScreen} posts={posts} setPosts={setPosts} reports={reports} setReports={setReports} blockedUsers={blockedUsers} setBlockedUsers={setBlockedUsers} />}
          {screen === "Admin" && <AdminPanel setScreen={setScreen} reports={reports} blockedUsers={blockedUsers} />}
          {screen === "Kaart" && <MapScreen setScreen={setScreen} />}
          {screen === "Garage" && <Garage setScreen={setScreen} />}
          {screen === "Afspraak" && <Appointment setScreen={setScreen} />}
          {screen === "Reviews" && <Reviews setScreen={setScreen} />}
          {screen === "Marktplaats" && <Marketplace setScreen={setScreen} />}
          {screen === "Verkopen" && <SellVehicle setScreen={setScreen} />}
          {screen === "Advertentie" && <ListingDetail setScreen={setScreen} />}
          {screen === "Support" && <Support setScreen={setScreen} />}
          {screen === "Geblokkeerd" && <Blocked setScreen={setScreen} />}
        </div>
      </section>
    </main>
  );
}
