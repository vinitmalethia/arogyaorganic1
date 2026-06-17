import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  BadgeCheck,
  BadgePercent,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Eye,
  Heart,
  Info,
  Leaf,
  Menu,
  MessageCircle,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Truck,
  User,
  Users,
  Zap,
  X
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { collections, products, whatsappNumber } from './data/products.js'

const farmHero =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=80'
const farmImage =
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80'
const ayurvedaImage =
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80'
const founderImage =
  'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1400&q=80'
const farmCareImage = '/story/farm-care.jpeg'
const herbsImage = '/story/ayurvedic-herbs.jpeg'
const gheeServingImage = '/story/ghee-serving.jpeg'

const promiseItems = [
  'Ethically raised Desi cows',
  'Traditional Bilona method',
  'Pure A2 milk and ghee',
  'Ayurvedic principles in every product',
  'Crafted with patience, care, and devotion'
]

const journeySteps = [
  ['01', 'Natural farms', 'Ingredients are selected from clean farms where soil health, seasonal rhythm, and careful handling matter.'],
  ['02', 'Ethical sourcing', 'We work with people who understand traditional food, Desi cow care, and patient production.'],
  ['03', 'Traditional processing', 'Bilona churning, small-batch packing, and low-intervention methods help preserve natural character.'],
  ['04', 'Home delivery', 'Every order is confirmed personally on WhatsApp, so families know exactly what they are receiving.']
]

const farmerStories = [
  {
    name: 'Savitri Devi',
    place: 'Organic vegetable grower',
    image: farmCareImage,
    story: 'Her family has always believed that healthy soil gives food its quiet strength. Our farm sourcing begins with that same patience.'
  },
  {
    name: 'Raghav Singh',
    place: 'Desi cow care partner',
    image: farmImage,
    story: 'Clean fodder, shade, water, and daily attention guide the way milk and ghee should begin.'
  },
  {
    name: 'Meera Joshi',
    place: 'Ayurvedic herbs curator',
    image: herbsImage,
    story: 'Herbs are selected for freshness, aroma, and traditional use, then blended with restraint instead of excess.'
  }
]

const knowledgePosts = [
  ['Why Bilona Ghee Feels Different', 'A short guide to the churning method, aroma, texture, and sattvic value of traditional ghee.'],
  ['Ayurveda in a Modern Kitchen', 'Simple ways to bring herbs, ghee, grains, and seasonal eating into everyday routines.'],
  ['Reading an Honest Ingredient Label', 'What to look for when choosing natural products with no preservatives or shortcuts.']
]

const seasonalCollections = [
  ['Monsoon Digestion', 'Triphala, warm ghee meals, and gentle herbal rituals for slower days.', herbsImage],
  ['Family Pantry Staples', 'Rice, wheat, and pure ghee for everyday Indian cooking.', '/products/premium-rice.png'],
  ['Ritual & Natural Living', 'Cow dung cakes and sattvic essentials for traditional home practices.', '/products/cow-dung-cakes.png']
]

function whatsappUrl(productName) {
  const text = productName
    ? `Hello ArogyaOrganic, I would like to buy ${productName}`
    : 'Hello ArogyaOrganic, I would like to know more about your organic products'

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}

function ButtonLink({ to, children, variant = 'primary', external = false }) {
  const className = `btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'}`
  if (external) {
    return (
      <a className={className} href={to} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const closeMenus = () => {
    setOpen(false)
    setMoreOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const closeOnResize = () => {
      if (window.innerWidth >= 900) setOpen(false)
    }
    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [open])

  const navItems = [
    ['HOME', '/'],
    ['SHOP', '/shop'],
    ['THE FARM', '/the-farm'],
    ['AYURVEDA', '/ayurveda']
  ]

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={closeMenus}>
          ArogyaOrganic
        </Link>

        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={closeMenus}>
              {label}
            </NavLink>
          ))}
          <div className="more-menu">
            <button type="button" onClick={() => setMoreOpen((value) => !value)}>
              MORE <ChevronDown size={14} />
            </button>
            <div className={`more-panel ${moreOpen ? 'show' : ''}`}>
              <Link to="/about" onClick={closeMenus}>
                About Us
              </Link>
              <Link to="/contact" onClick={closeMenus}>
                Contact Us
              </Link>
              <a href="/#faq" onClick={closeMenus}>
                FAQ
              </a>
            </div>
          </div>
        </div>

        <div className="nav-icons" aria-label="Utility links">
          <Link to="/shop" aria-label="Search products">
            <Search size={18} />
          </Link>
          <Link to="/shop" aria-label="Shopping bag">
            <ShoppingBag size={18} />
          </Link>
          <Link to="/contact" aria-label="Account">
            <User size={18} />
          </Link>
          <button className="mobile-toggle" type="button" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="section-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}

function CollectionCard({ collection }) {
  return (
    <article className="collection-card fade-in" data-aos="fade-up">
      <img src={collection.image} alt={collection.title} />
      <div>
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
        <Link to={collection.link}>Explore</Link>
      </div>
    </article>
  )
}

function ProductCard({ product, onQuickView }) {
  const rating = product.rating ?? '4.9'
  const reviews = product.reviews ?? '20'
  const savings = product.savings ?? 'Save 20%'

  return (
    <article className="product-card product-card-dark fade-in" data-aos="fade-up">
      <div className="product-media">
        <span className="product-glow" />
        <Link to={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="wish-button" type="button" aria-label={`Save ${product.name}`}>
          <Heart size={20} />
        </button>
      </div>
      <div className="product-card-body">
        <div className="rating-row" aria-label={`${rating} star rating`}>
          <span>
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={15} fill="currentColor" />
            ))}
          </span>
          <em>
            {rating} ({reviews} reviews)
          </em>
        </div>
        <Link to={`/shop/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <span className="pack-size">{product.packSize}</span>
        <p className="product-summary">{product.description}</p>
        <div className="stock-row">
          <Info size={17} />
          <span>In Stock</span>
        </div>
        <div className="product-row">
          <div className="price-stack">
            <strong>{product.price}</strong>
            {product.mrp && <span>{product.mrp}</span>}
            {product.mrp && (
              <em>
                <BadgePercent size={15} /> {savings}
              </em>
            )}
          </div>
          <div className="product-actions">
            <button className="cart-button" type="button" onClick={() => onQuickView?.(product)}>
              <Eye size={18} /> Quick View
            </button>
            <a className="order-pill" href={whatsappUrl(product.name)} target="_blank" rel="noreferrer">
              <Zap size={18} /> Buy Now
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

function AnimatedStat({ value, suffix = '', label }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const end = Number(value)
    if (!Number.isFinite(end)) return

    let frame = 0
    const totalFrames = 46
    const timer = window.setInterval(() => {
      frame += 1
      const progress = Math.min(frame / totalFrames, 1)
      setCount(Math.round(end * (1 - Math.pow(1 - progress, 3))))
      if (progress === 1) window.clearInterval(timer)
    }, 24)

    return () => window.clearInterval(timer)
  }, [value])

  return (
    <div className="stat-card" data-aos="fade-up">
      <strong>
        {count.toLocaleString('en-IN')}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

function HeroStat({ value, suffix = '', label, plain = false }) {
  if (plain) {
    return (
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    )
  }

  return (
    <div>
      <AnimatedStat value={value} suffix={suffix} label={label} />
    </div>
  )
}

function QuickViewModal({ product, onClose }) {
  if (!product) return null

  return (
    <div className="quick-view-backdrop" role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}>
      <div className="quick-view-panel">
        <button className="quick-view-close" type="button" onClick={onClose} aria-label="Close quick view">
          <X size={20} />
        </button>
        <div className="quick-view-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="quick-view-copy">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.name}</h2>
          <div className="detail-price">
            <strong>{product.price}</strong>
            {product.mrp && (
              <p>
                MRP <span>{product.mrp}</span>
              </p>
            )}
          </div>
          <p>{product.description}</p>
          <div className="transparency-mini">
            {product.benefits.slice(0, 4).map((benefit) => (
              <span key={benefit}>
                <BadgeCheck size={16} /> {benefit}
              </span>
            ))}
          </div>
          <div className="detail-actions">
            <ButtonLink to={whatsappUrl(product.name)} external>
              <MessageCircle size={18} /> Buy on WhatsApp
            </ButtonLink>
            <ButtonLink to={`/shop/${product.slug}`} variant="outline">
              Full details
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}

function FAQ({ items }) {
  return (
    <div className="faq-list">
      {items.map(([question, answer]) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  )
}

function Home() {
  useEffect(() => {
    const updateHeroParallax = () => {
      const hero = document.querySelector('.hero')
      if (!hero) return
      const distance = Math.min(window.scrollY * 0.18, 90)
      hero.style.setProperty('--hero-parallax', `${distance}px`)
    }

    updateHeroParallax()
    window.addEventListener('scroll', updateHeroParallax, { passive: true })
    return () => window.removeEventListener('scroll', updateHeroParallax)
  }, [])

  const faqItems = [
    ['Are ArogyaOrganic products certified organic?', 'We work with clean farms and small-batch producers who follow chemical-free cultivation and traditional processing standards.'],
    ['How do I place an order?', 'Choose a product and tap Buy Now or Order on WhatsApp. Our team confirms availability, pack size, and delivery details.'],
    ['Do you use preservatives?', 'Our pantry staples, honey, ghee, oils, and spices are selected for purity and packed without unnecessary additives.'],
    ['Where do you deliver?', 'Delivery availability is confirmed over WhatsApp based on your city and product selection.']
  ]

  return (
    <>
      <section className="hero">
        <img className="hero-bg" src={farmHero} alt="Warm sunlight over organic farm fields" />
        <div className="hero-overlay" />
        <div className="floating-leaves" aria-hidden="true">
          {[...Array(8)].map((_, index) => (
            <span key={index} className={`leaf-particle leaf-${index + 1}`}>
              <Leaf size={18 + (index % 3) * 5} />
            </span>
          ))}
        </div>
        <div className="container hero-content">
          <p className="eyebrow hero-tagline">From Indian soil, with care</p>
          <h1 className="word-reveal" aria-label="Pure Organic Goodness for Your Family">
            {['Pure', 'Organic', 'Goodness', 'for', 'Your', 'Family'].map((word, index) => (
              <span key={word} style={{ '--word-delay': `${0.32 + index * 0.13}s` }}>
                {word}
              </span>
            ))}
          </h1>
          <p className="hero-subtext">Farm fresh, chemical-free, natural products delivered with trust.</p>
          <div className="hero-actions">
            <ButtonLink to="/shop">
              <Sparkles size={17} /> Shop Now
            </ButtonLink>
            <ButtonLink to={whatsappUrl()} variant="outline" external>
              <MessageCircle size={18} /> Order on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="hero-stat-strip" aria-label="ArogyaOrganic impact">
        <div className="container hero-stat-grid">
          <HeroStat value="500" suffix="+" label="Farmers" />
          <HeroStat value="10000" suffix="+" label="Families" />
          <HeroStat value="100" suffix="%" label="Organic" />
          <HeroStat value="Est. 2020" label="Since" plain />
        </div>
      </section>

      <section className="section" data-aos="fade-up">
        <SectionIntro eyebrow="Crafted by Nature" title="Seasonal purity, handled with patience">
          Our products begin with mindful sourcing: healthy soil, traditional Indian processing, and
          small-batch care that respects the natural rhythm of each ingredient.
        </SectionIntro>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="collection-grid">
            {collections.map((collection) => (
              <CollectionCard key={collection.title} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      <section className="section oat-band" data-aos="fade-up">
        <SectionIntro eyebrow="Why ArogyaOrganic" title="Clean food, clear conscience" />
        <div className="container trust-grid">
          {['FSSAI Certified', 'Chemical Free', 'Farm Fresh', '100% Natural', 'Traditional Methods'].map(
            (item) => (
              <div className="trust-item" key={item}>
                <Leaf size={22} />
                <span>{item}</span>
              </div>
            )
          )}
        </div>
      </section>

      <section className="section" data-aos="fade-up">
        <SectionIntro eyebrow="Farm to Home" title="A transparent journey from soil to your kitchen">
          Every product follows a careful path designed around trust, traditional methods, and personal ordering.
        </SectionIntro>
        <div className="container journey-grid">
          {journeySteps.map(([number, title, body]) => (
            <article key={title} className="journey-step" data-aos="fade-up">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section oat-band" data-aos="fade-up">
        <SectionIntro eyebrow="Meet Our Farmers" title="Real hands behind every batch" />
        <div className="container farmer-grid">
          {farmerStories.map((farmer) => (
            <article className="farmer-card" key={farmer.name} data-aos="fade-up">
              <img src={farmer.image} alt={farmer.name} />
              <div>
                <p>{farmer.place}</p>
                <h3>{farmer.name}</h3>
                <span>{farmer.story}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-band">
        <div className="container stats-grid">
          <AnimatedStat value="500" suffix="+" label="Partner farmers" />
          <AnimatedStat value="10000" suffix="+" label="Happy families" />
          <AnimatedStat value="100" suffix="%" label="Organic promise" />
        </div>
      </section>

      <SplitSection
        image={farmCareImage}
        eyebrow="Our Farm Story"
        title="Food is the first medicine"
        body="What began as a simple belief grew into a mission to preserve the ancient wisdom of Ayurveda for modern families. Inspired by rural India and the teachings of our sages, we choose ingredients and processes that honor purity over speed."
        link="/the-farm"
        linkText="Visit the farm"
      />

      <section className="section story-panel-section">
        <div className="container story-panel">
          <div className="story-copy">
            <p className="eyebrow">Purity, tradition, Ayurveda</p>
            <h2>No chemicals. No preservatives. No compromises.</h2>
            <p>
              From Bilona A2 Desi Cow Ghee to fresh, wholesome dairy products, every offering is
              prepared to retain its natural nutrients, aroma, and sattvic qualities.
            </p>
          </div>
          <div className="promise-grid">
            {promiseItems.map((item) => (
              <div key={item}>
                <BadgeCheck size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        reverse
        image={herbsImage}
        eyebrow="Ayurveda"
        title="Traditional wisdom for modern living"
        body="Daily wellness is not a trend. It is a set of quiet rituals: pure ghee, natural herbs, sattvic ingredients, and food prepared with patience instead of artificial interventions."
        link="/ayurveda"
        linkText="Explore Ayurveda"
      />

      <section className="section">
        <SectionIntro eyebrow="Customer Reviews" title="Trusted in everyday kitchens" />
        <div className="container review-grid">
          {[
            ['The honey tastes beautifully natural. Nothing sharp or artificial, just clean floral sweetness.', 'Ananya R.'],
            ['Their ghee has become a staple at home. The aroma feels exactly like the ghee my grandmother made.', 'Rohit M.'],
            ['Elegant packaging, honest products, and quick WhatsApp support. A very reassuring experience.', 'Meera S.']
          ].map(([quote, name]) => (
            <article className="review-card" key={name} data-aos="fade-up">
              <div className="stars" aria-label="Five star review">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
              <p>“{quote}”</p>
              <strong>{name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section oat-band" data-aos="fade-up">
        <SectionIntro eyebrow="Ayurveda Knowledge" title="Learn before you buy">
          Gentle guides for families who want to understand ingredients, rituals, and traditional processing.
        </SectionIntro>
        <div className="container knowledge-grid">
          {knowledgePosts.map(([title, body]) => (
            <article key={title} className="knowledge-card" data-aos="fade-up">
              <BookOpen size={22} />
              <h3>{title}</h3>
              <p>{body}</p>
              <Link to="/ayurveda">Read guide</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section oat-band" id="faq">
        <SectionIntro eyebrow="FAQ" title="Simple answers before you order" />
        <div className="container faq-wrap">
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  )
}

function SplitSection({ image, eyebrow, title, body, link, linkText, reverse = false }) {
  return (
    <section className="section">
      <div className={`container split ${reverse ? 'reverse' : ''}`}>
        <div className="split-image">
          <img src={image} alt={title} />
        </div>
        <div className="split-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
          <Link to={link}>{linkText}</Link>
        </div>
      </div>
    </section>
  )
}

function StoryFeature({ image, eyebrow, title, body, points = [], reverse = false }) {
  return (
    <section className="story-feature">
      <div className={`container story-feature-grid ${reverse ? 'reverse' : ''}`}>
        <div className="story-feature-image">
          <img src={image} alt={title} />
        </div>
        <div className="story-feature-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
          {points.length > 0 && (
            <ul>
              {points.map((point) => (
                <li key={point}>
                  <BadgeCheck size={18} /> {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function Shop() {
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const featuredProduct = products[0]
  const shopFaqItems = [
    ['How do I order?', 'Tap Buy Now or Chat on WhatsApp. Our team confirms product availability, pack size, delivery city, and final order details.'],
    ['Are there preservatives?', 'No. Our products are selected around natural ingredients, traditional methods, and minimal intervention.'],
    ['Can I ask for product guidance?', 'Yes. Use the WhatsApp assistant and share your family size, routine, and preferred products.'],
    ['Do you offer seasonal recommendations?', 'Yes. Our seasonal wellness collections are designed around daily rituals, digestion, pantry staples, and traditional living.']
  ]
  const shopStats = [
    ['5', 'Curated SKUs'],
    ['100%', 'Natural sourcing'],
    ['24h', 'Order confirmation']
  ]
  const shopBenefits = [
    [ShieldCheck, 'Quality checked batches'],
    [Truck, 'Delivery coordinated on WhatsApp'],
    [PackageCheck, 'Premium packed products']
  ]
  const categoryChips = ['All Products', 'Ghee', 'Grains', 'Ayurveda', 'Natural Living']

  return (
    <main className="page">
      <section className="shop-hero">
        <div className="container shop-hero-grid">
          <div className="shop-hero-copy fade-in">
            <p className="eyebrow">Shop ArogyaOrganic</p>
            <h1>Premium organic products, ready to order</h1>
            <p>
              A focused selection of A2 ghee, grains, Ayurvedic wellness, and natural living essentials.
              Every order is confirmed personally on WhatsApp.
            </p>
            <div className="hero-actions">
              <ButtonLink to={whatsappUrl(featuredProduct.name)} external>
                <MessageCircle size={18} /> Order Best Seller
              </ButtonLink>
              <ButtonLink to="/shop/puro-a2-cow-ghee" variant="outline">
                View Ghee
              </ButtonLink>
            </div>
            <div className="shop-stats">
              {shopStats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to={`/shop/${featuredProduct.slug}`} className="featured-product-card fade-in">
            <span className="featured-kicker">Best seller this week</span>
            <img src={featuredProduct.image} alt={featuredProduct.name} />
            <div>
              <p>{featuredProduct.packSize}</p>
              <h2>{featuredProduct.name}</h2>
              <strong>{featuredProduct.price}</strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="shop-benefit-strip">
        <div className="container shop-benefits">
          {shopBenefits.map(([Icon, label]) => (
            <div key={label}>
              <Icon size={19} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-tight product-showcase-section">
        <div className="container">
          <div className="shop-toolbar">
            <div>
              <p className="eyebrow">Curated Catalogue</p>
              <h2>Choose your organic essentials</h2>
            </div>
            <div className="category-pills" aria-label="Product categories">
              {categoryChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-aos="fade-up">
        <div className="container spotlight">
          <div className="spotlight-image">
            <img src={featuredProduct.image} alt={featuredProduct.name} />
          </div>
          <div className="spotlight-copy">
            <p className="eyebrow">Featured Product</p>
            <h2>{featuredProduct.name}</h2>
            <p>{featuredProduct.description}</p>
            <div className="transparency-grid">
              {['A2 cow milk source', 'Traditional Bilona method', 'No preservatives', 'Small-batch prepared'].map((item) => (
                <span key={item}>
                  <BadgeCheck size={17} /> {item}
                </span>
              ))}
            </div>
            <ButtonLink to={`/shop/${featuredProduct.slug}`}>View full details</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section oat-band" data-aos="fade-up">
        <SectionIntro eyebrow="Seasonal Wellness" title="Collections for everyday rituals" />
        <div className="container seasonal-grid">
          {seasonalCollections.map(([title, body, image]) => (
            <article key={title} className="seasonal-card" data-aos="fade-up">
              <img src={image} alt={title} />
              <div>
                <CalendarDays size={20} />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shop-order-band">
        <div className="container order-band-inner">
          <div>
            <p className="eyebrow">Personal ordering</p>
            <h2>Need help choosing the right product?</h2>
            <p>Message us your family size, preferred products, and delivery city. We will suggest the right pack and confirm availability.</p>
          </div>
          <ButtonLink to={whatsappUrl()} external>
            <MessageCircle size={18} /> Chat on WhatsApp
          </ButtonLink>
        </div>
      </section>
      <section className="section oat-band">
        <SectionIntro eyebrow="FAQ" title="Questions before you order" />
        <div className="container faq-wrap">
          <FAQ items={shopFaqItems} />
        </div>
      </section>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </main>
  )
}

function ProductDetails() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const related = useMemo(() => products.filter((item) => item.slug !== slug).slice(0, 3), [slug])

  if (!product) {
    return (
      <main className="page">
        <PageHeader eyebrow="Not Found" title="Product unavailable" body="This product may have moved." />
      </main>
    )
  }

  return (
    <main className="page">
      <section className="section product-detail-section">
        <div className="container product-detail">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <div className="detail-meta">
              {product.badge && <span>{product.badge}</span>}
              {product.packSize && <span>{product.packSize}</span>}
            </div>
            <div className="detail-price">
              <strong>{product.price}</strong>
              {product.mrp && (
                <p>
                  MRP <span>{product.mrp}</span>
                </p>
              )}
            </div>
            <p>{product.description}</p>
            <div className="detail-actions">
              <ButtonLink to={whatsappUrl(product.name)} external>
                <MessageCircle size={18} /> Buy Now
              </ButtonLink>
              <ButtonLink to="/shop" variant="outline">
                Back to Shop
              </ButtonLink>
            </div>
            <div className="benefit-list">
              <h2>Benefits</h2>
              <ul>
                {product.benefits.map((benefit) => (
                  <li key={benefit}>
                    <Sprout size={18} /> {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="usage-box">
              <h2>Usage</h2>
              <p>{product.usage}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section oat-band">
        <div className="container detail-lower">
          <div>
            <SectionIntro eyebrow="Product FAQ" title="Before you order" />
            <FAQ items={product.faqs} />
          </div>
          <div>
            <SectionIntro eyebrow="Related" title="You may also like" />
            <div className="related-grid">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function PageHeader({ eyebrow, title, body }) {
  return (
    <section className="page-header">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </section>
  )
}

function Farm() {
  return (
    <main className="page">
      <PageHeader
        eyebrow="The Farm"
        title="Where care becomes nourishment"
        body="Our journey began with cows nurtured with love, natural fodder, and respect. Their milk became the foundation of handcrafted products prepared according to authentic Ayurvedic principles."
      />
      <SplitSection
        image={farmCareImage}
        eyebrow="Rural Indian Wisdom"
        title="Raised with patience, not pressure"
        body="We believe true purity begins before production. Ethical care, clean surroundings, natural feeding, and unhurried preparation help preserve the sattvic quality of every batch."
        link="/shop"
        linkText="Shop pure products"
      />
      <section className="section oat-band">
        <div className="container promise-band">
          <SectionIntro eyebrow="Our Promise" title="A way of life, not just a product" />
          <div className="promise-grid">
            {promiseItems.map((item) => (
              <div key={item}>
                <BadgeCheck size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function Ayurveda() {
  return (
    <main className="page">
      <PageHeader
        eyebrow="Ayurveda"
        title="Ancient wisdom for modern families"
        body="Ayurveda teaches that nourishment should support balance, vitality, and well-being. Our products are crafted around that belief, without shortcuts or artificial interventions."
      />
      <SplitSection
        image={herbsImage}
        eyebrow="Food as Medicine"
        title="A daily ritual of balance"
        body="The wisdom of Ayurveda lives in simple choices: pure ghee, sattvic ingredients, herbs used with respect, and food prepared in a way that keeps its natural energy intact."
        link="/shop/triphala-churna"
        linkText="Explore wellness"
      />
      <SplitSection
        reverse
        image={gheeServingImage}
        eyebrow="Sattvic Nourishment"
        title="Ghee, milk, and mindful meals"
        body="Our handcrafted dairy offerings reflect a commitment to purity, aroma, natural nutrients, and the comforting traditions of Indian homes."
        link="/shop/puro-a2-cow-ghee"
        linkText="Shop A2 ghee"
      />
      <section className="section section-tight">
        <div className="container editorial-grid">
          {[
            ['Morning Warmth', 'Begin with clean dairy, herbs, or golden milk for a gentle start.'],
            ['Balanced Cooking', 'Use ghee and grains prepared with patience, care, and tradition.'],
            ['Evening Calm', 'Return to simple Ayurvedic rituals that support rest and digestion.']
          ].map(([title, body]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function About() {
  const trustBadges = ['100% Organic', 'Farm Fresh', 'Traditional Methods', 'No Preservatives']

  return (
    <main className="page">
      <section className="story-banner">
        <img src={farmCareImage} alt="Traditional organic farm care" />
        <div className="story-banner-overlay" />
        <div className="container story-banner-content">
          <p className="eyebrow">Our Story</p>
          <h1>Food is the first medicine.</h1>
          <p>Purity, tradition, and the healing touch of Ayurveda for modern families.</p>
        </div>
      </section>

      <section className="section story-text-section">
        <div className="container story-text">
          <p className="eyebrow">Our Story</p>
          <h2>A simple belief became a lifelong mission.</h2>
          <div className="story-columns">
            <p>
              What began as a simple belief that food is the first medicine grew into a mission to
              preserve the ancient wisdom of Ayurveda for modern families.
            </p>
            <p>
              Inspired by the teachings of our sages and the timeless traditions of rural India, we
              nurtured our own cows with love, care, and natural fodder. Their milk became the
              foundation of our handcrafted products, prepared without shortcuts or artificial
              interventions.
            </p>
          </div>
        </div>
      </section>

      <StoryFeature
        image={farmCareImage}
        eyebrow="Traditional Farming"
        title="Raised close to the soil, with patience and care"
        body="Our farming practices respect natural rhythms: clean fodder, ethical care for Desi cows, and ingredients grown with attention to soil health. Purity begins long before a product reaches the kitchen."
        points={['Ethically raised Desi cows', 'Natural fodder and clean surroundings', 'Farm-led quality from the source']}
      />

      <StoryFeature
        reverse
        image={herbsImage}
        eyebrow="Ayurvedic Wisdom"
        title="Ancient principles, made practical for today"
        body="Every offering is guided by the Ayurvedic idea that nourishment should support balance, vitality, and well-being. We preserve natural nutrients, aroma, and sattvic qualities through careful preparation."
        points={['Ayurvedic principles in every product', 'No artificial interventions', 'Food prepared as daily wellness']}
      />

      <StoryFeature
        image={gheeServingImage}
        eyebrow="Our Promise"
        title="No chemicals. No preservatives. No compromises."
        body="From Bilona A2 Desi Cow Ghee to wholesome dairy products, our promise is simple: craft every batch with devotion, honesty, and respect for the traditions that shaped Indian homes."
        points={promiseItems}
      />

      <section className="story-trust-section">
        <div className="container story-trust-badges">
          {trustBadges.map((badge) => (
            <div key={badge}>
              <BadgeCheck size={19} />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Contact() {
  return (
    <main className="page">
      <PageHeader
        eyebrow="Contact"
        title="We are here to help you choose well"
        body="For orders, product questions, delivery availability, or farm sourcing enquiries, connect with the ArogyaOrganic team."
      />
      <section className="section section-tight">
        <div className="container contact-grid">
          <article>
            <h2>Order support</h2>
            <p>WhatsApp: +91 XXXXX XXXXX</p>
            <p>Email: care@arogyaorganic.in</p>
            <p>Hours: 10:00 AM - 7:00 PM</p>
            <ButtonLink to={whatsappUrl()} external>
              <MessageCircle size={18} /> Chat on WhatsApp
            </ButtonLink>
          </article>
          <article>
            <h2>Visit by appointment</h2>
            <p>ArogyaOrganic Farm Collective</p>
            <p>India</p>
            <p>Farm visits are scheduled seasonally for customers and sourcing partners.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand">
            ArogyaOrganic
          </Link>
          <p>Farm fresh, chemical-free, natural products delivered with trust.</p>
        </div>
        <div>
          <h3>Quick links</h3>
          <Link to="/shop">Shop</Link>
          <Link to="/the-farm">The Farm</Link>
          <Link to="/ayurveda">Ayurveda</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <p>care@arogyaorganic.in</p>
          <p>+91 XXXXX XXXXX</p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
        <div>
          <h3>Social</h3>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppAssistant() {
  const [open, setOpen] = useState(false)

  return (
    <div className={`whatsapp-assistant ${open ? 'open' : ''}`}>
      {open && (
        <div className="assistant-panel">
          <button type="button" onClick={() => setOpen(false)} aria-label="Close WhatsApp assistant">
            <X size={16} />
          </button>
          <p className="eyebrow">ArogyaOrganic Assistant</p>
          <h3>Need help choosing?</h3>
          <p>Tell us your family size, city, and preferred product. We will suggest the right pack.</p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Start WhatsApp chat
          </a>
        </div>
      )}
      <button className="assistant-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open WhatsApp assistant">
        <MessageCircle size={22} />
        <span>Chat with us</span>
      </button>
    </div>
  )
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    })
  }, [])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetails />} />
        <Route path="/the-farm" element={<Farm />} />
        <Route path="/ayurveda" element={<Ayurveda />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <WhatsAppAssistant />
    </>
  )
}

export default App
