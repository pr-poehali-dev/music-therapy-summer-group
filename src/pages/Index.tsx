import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/7d023e65-a7ae-46f3-915e-aeca9af26149/files/e00a0bad-c494-4995-93b8-7f63b4108496.jpg";
const GALLERY_IMGS = [
  "https://cdn.poehali.dev/projects/7d023e65-a7ae-46f3-915e-aeca9af26149/files/e00a0bad-c494-4995-93b8-7f63b4108496.jpg",
  "https://cdn.poehali.dev/projects/7d023e65-a7ae-46f3-915e-aeca9af26149/files/8d76eccb-66b2-4f30-afdf-f6ff79988855.jpg",
  "https://cdn.poehali.dev/projects/7d023e65-a7ae-46f3-915e-aeca9af26149/files/e3e5c9e0-67cb-40f2-b690-3c74a54a3009.jpg",
];

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О группе" },
  { id: "hosts", label: "Ведущие" },
  { id: "schedule", label: "Расписание" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

const HOSTS = [
  {
    name: "Алина Спивак",
    role: "Супервизор, ассоциированный тренер МГИ",
    quote: "Я с бережностью и вниманием открою себя навстречу вам, надеясь, что вместе у нас получится новая мелодия встречи.",
    phone: "8 906 984-48-29",
    photo: "https://cdn.poehali.dev/projects/7d023e65-a7ae-46f3-915e-aeca9af26149/bucket/afca4508-081a-4e58-aeed-622535da5abb.jpg",
    photoPosition: "center 10%",
    icon: "Brain",
  },
  {
    name: "Геннадий Авилов",
    role: "К.п.н., супервизор, ассоциированный тренер МГИ",
    quote: "Я буду замечать тихие ноты вашей мелодии и давать им пространство, резонируя и усиливая их звучание. Ещё я буду замечать ритмический рисунок и поддерживать ритм именно вашей мелодии.",
    phone: "8 903 944-71-16",
    photo: "https://cdn.poehali.dev/projects/7d023e65-a7ae-46f3-915e-aeca9af26149/bucket/fa970446-fcd2-4489-8f52-a11ead270f45.jpg",
    photoPosition: "center 5%",
    icon: "Users",
  },
];

const SCHEDULE = [
  { date: "03.06.2026", weekday: "Среда" },
  { date: "10.06.2026", weekday: "Среда" },
  { date: "17.06.2026", weekday: "Среда" },
  { date: "24.06.2026", weekday: "Среда" },
  { date: "01.07.2026", weekday: "Среда" },
  { date: "08.07.2026", weekday: "Среда" },
  { date: "15.07.2026", weekday: "Среда" },
  { date: "22.07.2026", weekday: "Среда" },
];

const SYMBOLS = ["◯", "◎", "∿", "⌒", "◇"];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const link of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(link.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-golos bg-charcoal text-cream-light min-h-screen overflow-x-hidden">
      {/* Subtle floating symbols */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {SYMBOLS.map((sym, i) => (
          <span
            key={i}
            className="absolute font-cormorant text-gold select-none"
            style={{
              left: `${8 + i * 19}%`,
              top: `${10 + i * 14}%`,
              fontSize: `${2.5 + i * 0.5}rem`,
              opacity: 0.06,
              animation: `note-float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.9}s`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/90 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <span className="text-gold text-xl font-cormorant">◎</span>
            <span className="font-cormorant text-lg font-semibold text-cream-light tracking-wide group-hover:text-gold transition-colors">
              Своя мелодия
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm tracking-wide transition-all duration-300 hover:text-gold relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                  activeSection === link.id
                    ? "text-gold after:w-full"
                    : "text-cream-dark after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-cream-light hover:text-gold transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-charcoal border-t border-gold/20 px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left py-2 text-sm tracking-wide transition-colors ${
                  activeSection === link.id ? "text-gold" : "text-cream-dark hover:text-gold"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Своя мелодия" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p
            className="font-cormorant text-gold italic text-xl mb-4 tracking-widest opacity-0"
            style={{ animation: "fade-in 0.8s ease-out 0.3s forwards" }}
          >
            психотерапевтическая группа
          </p>
          <h1
            className="font-cormorant text-6xl md:text-8xl font-light text-cream-light leading-tight mb-6 opacity-0"
            style={{ animation: "fade-in 0.8s ease-out 0.5s forwards" }}
          >
            Своя<br />
            <em className="text-gold font-normal">мелодия</em>
          </h1>
          <p
            className="text-cream-dark text-lg font-light leading-relaxed mb-10 opacity-0"
            style={{ animation: "fade-in 0.8s ease-out 0.8s forwards" }}
          >
            Профессиональное пространство для психотерапевтов.<br className="hidden md:block" />
            Супервизия, обмен опытом и поддержка коллег.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
            style={{ animation: "fade-in 0.8s ease-out 1s forwards" }}
          >
            <button
              onClick={() => scrollTo("schedule")}
              className="bg-gold text-charcoal font-semibold px-8 py-3 tracking-wide hover:bg-gold-light transition-all duration-300 hover:scale-105 text-sm"
            >
              РАСПИСАНИЕ ВСТРЕЧ
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="border border-gold/50 text-cream-light px-8 py-3 tracking-wide hover:border-gold hover:text-gold transition-all duration-300 text-sm"
            >
              УЗНАТЬ БОЛЬШЕ
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-cream-dark text-xs tracking-widest">ПРОКРУТИ ВНИЗ</span>
          <Icon name="ChevronDown" size={18} className="text-gold animate-bounce" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-cormorant italic text-lg tracking-widest">о группе</span>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream-light mt-2 mb-6 leading-tight">
                Пространство<br />для практиков
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="leading-relaxed mb-5 font-light text-[#e6cea6]">Терапевтическая группа «Своя мелодия» — это закрытая профессиональная группа для практикующих психотерапевтов. Это пространство, где у вас есть возможность услышать голос своей собственной мелодии, звучащей в жизни и профессии.</p>
              <p className="text-cream-dark leading-relaxed mb-5 font-light">Коллеги! Мы с вами выбрали профессию, где главный инструмент — мы сами. Наш внутренний психический мир настроен как музыкальный инструмент: он резонирует, отзывается на чужую боль, звучит в унисон с клиентом. Именно им мы и работаем. Заботиться о нём — не просто важно, это жизненно необходимо. 

Какая ваша мелодия?
· Звучит ли она сейчас гармонично?
· Или в ней появились искажения, фальшивые ноты, глухие паузы?
· А может, вы заметили, что ваша мелодия стала тише или вовсе замолкает в присутствии клиента?

В кабинете рядом с другим мы можем замечать усталость, апатию, отсутствие любопытства к себе и другому, чувство опустошения. Это не поломка, а сигнал о том, что пора позаботиться о себе.</p>
              <p className="text-cream-dark leading-relaxed font-light">
                Группа открыта для специалистов любых терапевтических направлений — психоанализ, гештальт, КПТ, экзистенциальная терапия. Важна не школа, а готовность к диалогу.
              </p>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden">
                <img
                  src={GALLERY_IMGS[1]}
                  alt="О группе"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-wine p-6 border border-gold/30">
                <span className="font-cormorant text-4xl text-gold font-light">20+</span>
                <p className="text-cream-dark text-xs tracking-wide mt-1">лет опыта</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="h-px bg-gold/30 flex-1 max-w-xs" />
        <span className="text-gold text-xl font-cormorant">◎</span>
        <div className="h-px bg-gold/30 flex-1 max-w-xs" />
      </div>

      {/* HOSTS */}
      <section id="hosts" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-cormorant italic text-lg tracking-widest">команда</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream-light mt-2">
              Ведущие группы
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {HOSTS.map((host, i) => (
              <div
                key={i}
                className="group relative bg-charcoal-light border border-gold/10 p-8 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1"
              >
                {host.photo ? (
                  <div className="w-full h-64 overflow-hidden border border-gold/30 mb-6 group-hover:border-gold/60 transition-colors">
                    <img src={host.photo} alt={host.name} className="w-full h-full object-cover" style={{ objectPosition: host.photoPosition }} />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-wine/40 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-wine/60 transition-colors">
                    <Icon name={host.icon as "Brain" | "Users"} size={48} className="text-gold/40" fallback="User" />
                  </div>
                )}
                <h3 className="font-cormorant text-2xl text-cream-light mb-1">{host.name}</h3>
                <p className="text-gold text-xs tracking-widest mb-5">{host.role.toUpperCase()}</p>
                <blockquote className="text-cream-dark font-light text-sm leading-relaxed italic border-l-2 border-gold/30 pl-4 mb-5">
                  «{host.quote}»
                </blockquote>
                <a
                  href={`tel:+7${host.phone.replace(/\D/g, "").slice(1)}`}
                  className="flex items-center gap-2 text-gold/70 hover:text-gold transition-colors text-sm"
                >
                  <Icon name="Phone" size={13} className="text-gold/70" fallback="Phone" />
                  {host.phone}
                </a>
                <span className="absolute top-4 right-6 text-gold/20 text-3xl font-cormorant group-hover:text-gold/40 transition-colors">◎</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-24 bg-charcoal-light/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-cormorant italic text-lg tracking-widest">расписание</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream-light mt-2">
              Встречи группы
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-4" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-charcoal border border-gold/20 p-8 mb-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gold/15">
                <div className="w-12 h-12 bg-wine/40 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="CalendarDays" size={20} className="text-gold" fallback="Calendar" />
                </div>
                <div>
                  <p className="text-gold text-xs tracking-widest mb-1">СТАРТ ПРОГРАММЫ</p>
                  <p className="font-cormorant text-2xl text-cream-light">3 июня 2026 года</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-gold text-xs tracking-widest mb-1">ВРЕМЯ</p>
                  <p className="font-cormorant text-2xl text-cream-light">18:00 – 21:00</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SCHEDULE.map((item, i) => (
                  <div
                    key={i}
                    className={`border p-3 text-center transition-all duration-300 ${i === 0 ? "border-gold/60 bg-wine/20" : "border-gold/15 hover:border-gold/40"}`}
                  >
                    {i === 0 && (
                      <span className="text-gold text-xs tracking-widest block mb-1">СТАРТ</span>
                    )}
                    <p className="font-cormorant text-xl text-cream-light">{item.date.slice(0, 5)}</p>
                    <p className="text-cream-dark text-xs mt-1">{item.date.slice(6)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-cream-dark text-sm mb-2">Встречи проходят очно.</p>
            <p className="text-cream-dark text-sm mb-6">
              Очный адрес: <span className="text-gold">ул. Шестакова, 6. кабинет 212, 2 этаж (г. Кемерово)</span>
            </p>
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-gold text-charcoal font-semibold px-8 py-3 tracking-wide hover:bg-gold-light transition-all duration-300 hover:scale-105 text-sm"
            >
              ЗАПИСАТЬСЯ В ГРУППУ
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-cormorant italic text-lg tracking-widest">атмосфера</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream-light mt-2">
              Наши встречи
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-4" />
            <p className="text-cream-dark mt-4 font-light">Пространство доверия и профессионального диалога</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GALLERY_IMGS.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group cursor-pointer ${i === 0 ? "md:col-span-2" : ""}`}
                onClick={() => setLightboxImg(img)}
              >
                <img
                  src={img}
                  alt={`Встреча ${i + 1}`}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <div className="w-12 h-12 border border-cream-light rounded-full flex items-center justify-center">
                      <Icon name="ZoomIn" size={18} className="text-cream-light" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-charcoal/60 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream-dark hover:text-cream-light transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <Icon name="X" size={28} />
          </button>
          <img
            src={lightboxImg}
            alt="Фото"
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-charcoal-light/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-cormorant italic text-lg tracking-widest">связь</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream-light mt-2">
              Контакты
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-4" />
          </div>

          <div className="max-w-2xl mx-auto">
              <h3 className="font-cormorant text-3xl text-cream-light mb-8">Как с нами связаться</h3>
              <div className="space-y-6">
                {[
                  { icon: "MapPin", label: "Очный адрес", value: "г. Кемерово, ул. Шестакова, 6\nкабинет 212, 2 этаж", link: "https://go.2gis.com/7e3BN" },
                  { icon: "Phone", label: "Алина Спивак", value: HOSTS[0].phone },
                  { icon: "Phone", label: "Геннадий Авилов", value: HOSTS[1].phone },
                  { icon: "Mail", label: "Email", value: "group@svoyamelodia.ru" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-wine/30 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon as "MapPin" | "Phone" | "Mail"} size={16} className="text-gold" fallback="Info" />
                    </div>
                    <div>
                      <p className="text-gold text-xs tracking-widest mb-1">{item.label.toUpperCase()}</p>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-cream-light text-sm whitespace-pre-line leading-relaxed hover:text-gold transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-cream-light text-sm whitespace-pre-line leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 border border-gold/20 bg-wine/10">
                <p className="text-cream-dark text-sm leading-relaxed font-light">
                  <span className="text-gold text-xs tracking-widest block mb-2">ВАЖНО</span>
                  Участие в группе требует подписания соглашения о конфиденциальности. Вся информация, обсуждаемая на встречах, остаётся внутри группы.
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                {[
                  { icon: "Send", label: "Telegram" },
                  { icon: "Mail", label: "Email" },
                ].map((s, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 border border-gold/30 hover:border-gold hover:bg-wine/30 flex items-center justify-center transition-all duration-300 group"
                    title={s.label}
                  >
                    <Icon name={s.icon as "Send" | "Mail"} size={16} className="text-cream-dark group-hover:text-gold transition-colors" fallback="Link" />
                  </button>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/20 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gold text-lg font-cormorant">◎</span>
            <span className="font-cormorant text-cream-dark italic">Своя мелодия</span>
          </div>
          <p className="text-cream-dark/50 text-xs text-center">
            © 2024 Психотерапевтическая группа «Своя мелодия». Все права защищены.
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.slice(1).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-cream-dark/60 text-xs hover:text-gold transition-colors tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;