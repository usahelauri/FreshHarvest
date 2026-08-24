import BrandExperience from "./brand-experience";
import FruitTree3D from "./fruit-tree-3d";
import ProductLineGallery from "./product-line-gallery";

const productLines = [
  {
    key: "fresh",
    eyebrow: "Собственное производство",
    name: "Fresh Harvest",
    count: "56 вкусов",
    format: "замороженное пюре · 1 кг",
    description:
      "Фруктовые, ягодные и авторские вкусы для лимонадов, коктейлей, десертов, соусов и начинок.",
    facts: ["90% фруктов или ягод", "10% сахара", "−18 °C · 12 месяцев"],
    images: [
      { src: "/products/passionfruit-premium.webp", alt: "Пюре Fresh Harvest со вкусом маракуйи" },
      { src: "/products/pineapple-premium.webp", alt: "Пюре Fresh Harvest со вкусом ананаса" },
      { src: "/products/strawberry-premium.webp", alt: "Пюре Fresh Harvest со вкусом клубники" },
      { src: "/products/mango-premium.webp", alt: "Пюре Fresh Harvest со вкусом манго" },
    ],
  },
  {
    key: "agro",
    eyebrow: "Для регулярного расхода",
    name: "Проф Агро Пюре",
    count: "17 вкусов",
    format: "упаковка 1 кг · коробка 12 кг",
    description:
      "Профессиональная линейка для заведений с регулярным расходом и закупок большими объёмами.",
    images: [
      { src: "/products/proff-agro-mango-premium.webp", alt: "Пюре Proff Agro Puree со вкусом манго" },
      { src: "/products/proff-agro-raspberry-premium.webp", alt: "Пюре Proff Agro Puree со вкусом малины" },
      { src: "/products/proff-agro-beet-premium.webp", alt: "Пюре Proff Agro Puree из свёклы" },
      { src: "/products/proff-agro-strawberry-premium.webp", alt: "Пюре Proff Agro Puree со вкусом клубники" },
    ],
  },
  {
    key: "collcreat",
    eyebrow: "Сиропы для HoReCa",
    name: "CollCreat",
    count: "41 вкус",
    format: "сиропы · 1 л",
    description:
      "Фруктовые, ягодные, десертные и пряные вкусы для кофе, лимонадов, коктейлей и сезонных предложений.",
    images: [
      { src: "/products/collcreat-coconut-premium.webp", alt: "Сироп CollCreat со вкусом кокоса" },
      { src: "/products/collcreat-chocolate-premium.webp", alt: "Сироп CollCreat со вкусом шоколада" },
    ],
  },
  {
    key: "nectresso",
    eyebrow: "От классики до сочетаний",
    name: "Nectresso",
    count: "50 вкусов",
    format: "сиропы · 1 л",
    description:
      "Широкая линейка для барной и кофейной карты — от привычных вкусов до необычных сочетаний.",
    images: [
      { src: "/products/nectresso-lavender-premium.webp", alt: "Сироп Nectresso со вкусом лаванды" },
      { src: "/products/nectresso-nougat-peanut-premium.webp", alt: "Сироп Nectresso со вкусом нуги и арахиса" },
      { src: "/products/nectresso-maple-premium.webp", alt: "Сироп Nectresso со вкусом клёна" },
    ],
  },
];

const networkTerms = [
  { number: "01", title: "Персональная цена", text: "Условия под объём, ассортимент и задачи сети." },
  { number: "02", title: "Отсрочка до 14 дней", text: "Возможна после согласования условий сотрудничества." },
  { number: "03", title: "Производство СТМ", text: "Продукт под вашей маркой на собственной площадке." },
  { number: "04", title: "Эксклюзивный вкус", text: "Разработка вкуса специально под концепцию и меню." },
];

const steps = [
  ["Выбираете объект", "Сообщаете, куда удобно направить образцы."],
  ["Собираем набор", "Подбираем вкусы под бар, кухню или кондитерский цех."],
  ["Команда тестирует", "Оценивает продукт в реальных рецептурах и процессах."],
  ["Фиксируем условия", "Согласовываем ассортимент, цену, объём и график поставок."],
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main className="site-shell">
      <BrandExperience />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Fresh Harvest — наверх">
          <img src="/brand/fresh-harvest-mark.png" alt="" width="52" height="52" />
          <span className="brand-copy">
            <strong>Fresh Harvest</strong>
            <small>пюре и сиропы для HoReCa</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#products">Продукция</a>
          <a href="#networks">Для сетей</a>
          <a href="#process">Как работаем</a>
        </nav>

        <div className="header-actions">
          <div id="theme-control" />
          <a className="header-contact" href="https://t.me/mixxxiko" target="_blank" rel="noreferrer">
            Обсудить поставку <ArrowIcon />
          </a>
        </div>
      </header>

      <section className="proposal-hero" id="top">
        <div className="proposal-atmosphere" aria-hidden="true"><i /><i /><i /></div>
        <div className="proposal-grid section-shell">
          <div className="proposal-copy reveal">
            <p className="proposal-overline"><span>Fresh Harvest</span> · HoReCa · 2026</p>
            <h1><span>Коммерческое</span><mark>предложение</mark></h1>
            <p className="proposal-lead">
              Пюре и сиропы из фруктов и ягод для ресторанов, баров, кофеен и кондитерских.
              Собственное производство и поставки по всей России.
            </p>
            <div className="proposal-actions">
              <a className="button button-primary" href="#offer">Смотреть предложение <span aria-hidden="true">↓</span></a>
              <a className="proposal-link" href="https://t.me/mixxxiko" target="_blank" rel="noreferrer">Получить образцы <ArrowIcon /></a>
            </div>
            <div className="proposal-facts" aria-label="Ключевые преимущества">
              <span><b>164</b> позиции</span>
              <span><b>4</b> линейки</span>
              <span><b>0 ₽</b> образцы</span>
            </div>
          </div>

          <div className="proposal-tree-wrap reveal">
            <FruitTree3D />
            <div className="tree-control-hint"><i aria-hidden="true">↔</i><span>Двигайте курсором<br />и нажимайте на плоды</span></div>
          </div>
        </div>
        <a className="proposal-scroll" href="#offer" aria-label="Перейти к коммерческому предложению"><span>Далее</span><i>↓</i></a>
      </section>

      <section className="hero section-shell" id="offer">
        <div className="hero-copy reveal">
          <p className="kicker"><span />Fresh Harvest · решения для HoReCa</p>
          <h2 className="hero-title">Натуральные<br />решения для<br /><mark>профессионалов</mark></h2>
          <p className="hero-lead">
            Пюре и сиропы для барной карты, кухни и кондитерского цеха. Собственное
            производство в Подмосковье и поставки по всей России.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://t.me/mixxxiko" target="_blank" rel="noreferrer">
              Получить образцы <ArrowIcon />
            </a>
            <a className="button button-secondary" href="#products">
              Смотреть ассортимент <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-proof" aria-label="Основные условия">
            <div><strong>164</strong><span>позиции<br />в ассортименте</span></div>
            <div><strong>10 000 ₽</strong><span>минимальный<br />заказ</span></div>
            <div><strong>0 ₽</strong><span>доставка по Москве<br />от 10 000 ₽</span></div>
          </div>
        </div>

        <div className="hero-stage reveal" aria-label="Продукция Fresh Harvest">
          <div className="stage-logo" aria-hidden="true">
            <img src="/brand/fresh-harvest-mark.png" alt="" width="520" height="520" />
          </div>
          <div className="stage-grid" aria-hidden="true" />
          <div className="product-podium main-product">
            <img src="/products/passionfruit-premium.webp" alt="Пюре Fresh Harvest со вкусом маракуйи" width="1086" height="1448" fetchPriority="high" />
            <span>Fresh Harvest · Маракуйя</span>
          </div>
          <div className="product-podium side-product side-product-one">
            <img src="/products/nectresso-lavender-premium.webp" alt="Сироп Nectresso со вкусом лаванды" width="1086" height="1448" fetchPriority="high" />
          </div>
          <div className="product-podium side-product side-product-two">
            <img src="/products/proff-agro-raspberry-premium.webp" alt="Пюре Проф Агро со вкусом малины" width="1086" height="1448" fetchPriority="high" />
          </div>
          <div className="stage-badge"><i />Бесплатные образцы</div>
          <div className="wave-lines" aria-hidden="true"><span /><span /><span /><span /></div>
        </div>
      </section>

      <div className="promise-strip" aria-label="Преимущества">
        <div>
          <span>Натуральность</span><i />
          <span>Свежесть</span><i />
          <span>Стабильное качество</span><i />
          <span>Профессиональный подход</span><i />
          <span>Натуральность</span><i />
          <span>Свежесть</span>
        </div>
      </div>

      <section className="products section-shell" id="products">
        <div className="section-heading reveal">
          <div>
            <p className="section-index">01 · Продукция</p>
            <h2>Четыре линейки.<br /><mark>Одна система качества.</mark></h2>
          </div>
          <p className="section-intro">
            Подберём позиции под рецептуры, объём расхода и экономику заведения. Смешанная
            коробка возможна — начинайте с тех вкусов, которые действительно нужны.
          </p>
        </div>

        <div className="line-grid">
          {productLines.map((line, index) => (
            <article className={`line-card line-${line.key} reveal`} key={line.key}>
              <div className="line-card-top">
                <p>{line.eyebrow}</p>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <ProductLineGallery images={line.images} />
              <div className="line-card-content">
                <h3>{line.name}</h3>
                <div className="line-meta"><strong>{line.count}</strong><span>{line.format}</span></div>
                <p>{line.description}</p>
                {line.facts && <div className="fact-row">{line.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="networks-wrap" id="networks">
        <div className="networks section-shell">
          <div className="networks-copy reveal">
            <p className="section-index section-index-light">02 · Для сетей</p>
            <h2>Условия растут<br />вместе с <mark>вашей сетью</mark></h2>
            <p>Мы сами производим пюре Fresh Harvest, поэтому можем гибко обсуждать формат сотрудничества, рецептуру и график поставок.</p>
            <div className="network-note"><span aria-hidden="true">✦</span><p>Каждое условие фиксируется индивидуально после знакомства с задачей сети.</p></div>
          </div>
          <div className="terms-grid">
            {networkTerms.map((term) => (
              <article className="term-card reveal" key={term.number}>
                <span>{term.number}</span>
                <div><h3>{term.title}</h3><p>{term.text}</p></div>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </div>
        <div className="network-wave" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </section>

      <section className="process section-shell" id="process">
        <div className="section-heading process-heading reveal">
          <div>
            <p className="section-index">03 · Как начинаем</p>
            <h2>От дегустации<br />до регулярной поставки</h2>
          </div>
          <div className="sample-seal"><strong>FREE</strong><span>образцы для теста</span></div>
        </div>
        <ol className="steps">
          {steps.map(([title, text], index) => (
            <li className="reveal" key={title}>
              <div className="step-number">0{index + 1}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < steps.length - 1 && <span className="step-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-card reveal">
          <div className="contact-copy">
            <p className="section-index section-index-light">04 · Дегустация</p>
            <h2>Дайте продукту<br /><mark>сказать за себя</mark></h2>
            <p>Напишите, на какой объект удобнее направить бесплатные образцы. Подберём вкусы под задачи вашей команды.</p>
            <a className="button button-light" href="https://t.me/mixxxiko" target="_blank" rel="noreferrer">
              Написать в Telegram <strong>@mixxxiko</strong><ArrowIcon />
            </a>
          </div>
          <div className="contact-visual">
            <img src="/products/pineapple-premium.webp" alt="Пюре Fresh Harvest со вкусом ананаса" width="1086" height="1448" loading="lazy" decoding="async" />
            <div className="contact-logo" aria-hidden="true"><img src="/brand/fresh-harvest-mark.png" alt="" width="320" height="320" /></div>
            <span className="contact-label">Образцы — бесплатно</span>
          </div>
        </div>
      </section>

      <footer className="footer section-shell">
        <div className="brand footer-brand">
          <img src="/brand/fresh-harvest-mark.png" alt="" width="46" height="46" />
          <span className="brand-copy"><strong>Fresh Harvest</strong><small>Р‑Маркет · пюре и сиропы для HoReCa</small></span>
        </div>
        <p>Собственное производство в Подмосковье</p>
        <p>Поставки по всей России</p>
      </footer>

      <a className="mobile-cta" href="https://t.me/mixxxiko" target="_blank" rel="noreferrer">
        Получить образцы <ArrowIcon />
      </a>
    </main>
  );
}
