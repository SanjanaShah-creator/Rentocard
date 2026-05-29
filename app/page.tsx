'use client'

import { useEffect, useState } from 'react'

const CHIPS = ['All Products', 'Laptops', 'Gaming', 'Cameras', 'Projectors', 'Appliances', 'Tablets']

const PRODUCTS = [
  { id: 'mbm4',  cat: 'Laptops',    badge: 'new',  img: 'https://www.rentocart.com/wp-content/uploads/2026/02/Macbook-M4-16GB-RAM-512GB-SSD.jpg.jpg.jpeg', name: 'MacBook Pro M4 · 16GB / 512GB SSD',            price: '₹199', period: '/day', old: '',      rating: '4.9', reviews: '312', tint: 't-teal'   },
  { id: 'mbm1',  cat: 'Laptops',    badge: 'hot',  img: 'https://www.rentocart.com/wp-content/uploads/2024/05/MacBook-Air-M1-8GB-RAM-256-GB-SSD.jpg',          name: 'MacBook Air M1 · 8GB / 256GB SSD',             price: '₹89',  period: '/day', old: '₹120',  rating: '4.9', reviews: '342', tint: 't-teal'   },
  { id: 'ps5',   cat: 'Gaming',     badge: 'pop',  img: 'https://www.rentocart.com/wp-content/uploads/2024/02/sony-playstation-5-disk-version-gaming-console-1-600x600-1.webp', name: 'PlayStation 5 + 2 DualSense Controllers', price: '₹120', period: '/day', old: '',      rating: '4.9', reviews: '491', tint: 't-orange' },
  { id: 'proj',  cat: 'Projectors', badge: 'hot',  img: 'https://www.rentocart.com/wp-content/uploads/2024/11/Epson-Projector-3300-Lumens.png',                 name: 'Epson Full HD Projector · 3300 Lumens',        price: '₹450', period: '/day', old: '₹600',  rating: '4.7', reviews: '154', tint: 't-blue'   },
  { id: 'gopro', cat: 'Cameras',    badge: 'new',  img: 'https://www.rentocart.com/wp-content/uploads/2026/02/GoPro-hero-13.jpg.jpeg',                           name: 'GoPro Hero 13 · Action Camera',                price: '₹280', period: '/day', old: '',      rating: '4.8', reviews: '203', tint: 't-green'  },
  { id: 'air',   cat: 'Appliances', badge: 'pop',  img: 'https://www.rentocart.com/wp-content/uploads/2024/05/Honeywell-Air-Touch-V3-Air-Purifier-1.jpg',        name: 'Honeywell Air Touch V3 Purifier',               price: '₹145', period: '/day', old: '₹190',  rating: '4.8', reviews: '276', tint: 't-teal'   },
  { id: 'tab',   cat: 'Tablets',    badge: 'hot',  img: 'https://www.rentocart.com/wp-content/uploads/2025/12/original-imaguyf2e6rbsnrf.webp',                   name: 'Samsung Galaxy Tab A9 · 8GB / 128GB',          price: '₹75',  period: '/day', old: '',      rating: '4.7', reviews: '187', tint: 't-orange' },
  { id: 'i7',    cat: 'Laptops',    badge: 'pop',  img: 'https://www.rentocart.com/wp-content/uploads/2025/12/Intel-i7-10th-Gen-16GB-RAM-512-GB-SSD.jpg',        name: 'Intel i7 10th Gen · 16GB / 512GB SSD',         price: '₹95',  period: '/day', old: '₹130',  rating: '4.6', reviews: '132', tint: 't-blue'   },
]

export default function Home() {
  const [scrolled, setScrolled]       = useState(false)
  const [showTop, setShowTop]         = useState(false)
  const [chip, setChip]               = useState('All Products')
  const [wishlist, setWishlist]       = useState<Set<string>>(new Set())

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.08 })

    document.querySelectorAll(
      '.bento-card,.p-card,.how-card,.why-feat,.t-card,.city-tile,.eco-stat,.eco-bub'
    ).forEach(el => {
      const h = el as HTMLElement
      h.style.opacity = '0'
      h.style.transform = 'translateY(20px)'
      h.style.transition = 'opacity .5s ease, transform .5s ease'
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  const toggleWish = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="#"><img src="https://www.rentocart.com/wp-content/uploads/2023/03/img_1345_720.png" alt="RentoCart.com" className="nav-logo-img" /></a>
          <ul className="nav-links">
            {['Home','Categories','Products','Cities','Partner With Us','Blog'].map((l, i) => (
              <li key={l}><a href={i===0?'#':i===1?'#categories':i===2?'#products':i===3?'#cities':'#'} className={`nav-a${i===0?' active':''}`}>{l}</a></li>
            ))}
          </ul>
          <div className="nav-right">
            <div className="nav-city"><span className="live-dot" />Bengaluru ▾</div>
            <a href="#" className="nav-login">Log In</a>
            <a href="#products" className="nav-cta">Rent Now →</a>
            <div className="nav-ham"><span /><span /><span /></div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span className="badge-dot" />
              <span className="badge-teal">New</span> — MacBook Pro M4 now available for rent
            </div>
            <h1 className="hero-h1">
              Rent Premium.<br />
              <span className="highlight">Pay Less.</span><br />
              Live Better.
            </h1>
            <div className="hero-tagline">
              <span className="tag-teal">Rent</span>
              <span className="tag-sep" />
              <span className="tag-orange">Relax</span>
              <span className="tag-sep" />
              <span className="tag-teal">Return</span>
            </div>
            <p className="hero-desc">
              Laptops, TVs, Gaming Consoles, Projectors &amp; more — delivered to your door in under 24 hours. No ownership, no depreciation, no regrets.
            </p>
            <div className="hero-search">
              <div className="hs-seg">
                <span className="hs-ico">📍</span>
                <div><div className="hs-lbl">Your City</div><div className="hs-val">Bengaluru ▾</div></div>
              </div>
              <div className="hs-seg" style={{flex:2}}>
                <span className="hs-ico">🔍</span>
                <div style={{width:'100%'}}>
                  <div className="hs-lbl">What do you need?</div>
                  <input className="hs-input" type="text" placeholder="Search laptops, TVs, PS5, projectors…" />
                </div>
              </div>
              <button className="hs-btn">Find Rentals</button>
            </div>
            <div className="hero-pills">
              {['⚡ 24-hr delivery','🔒 100% refundable deposit','🛠️ Free maintenance','⬆️ Upgrade anytime'].map(p => (
                <div key={p} className="h-pill">{p}</div>
              ))}
            </div>
          </div>

          {/* ── Hero product showcase ── */}
          <div className="hero-showcase">
            <div className="hero-prod-grid">

              {/* MacBook — tall, spans 2 rows */}
              <div className="hp-card hp-card-tall">
                <div className="hp-img">
                  <span className="hp-badge">🔥 Most Rented</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.rentocart.com/wp-content/uploads/2024/05/MacBook-Air-M1-8GB-RAM-256-GB-SSD.jpg" alt="MacBook Air M1" />
                </div>
                <div className="hp-foot">
                  <div className="hp-name">MacBook Air M1 · 8GB / 256GB</div>
                  <div style={{display:'flex',alignItems:'baseline',gap:4}}>
                    <span className="hp-price">₹89</span><span className="hp-per">/day</span>
                  </div>
                </div>
              </div>

              {/* PS5 — top right */}
              <div className="hp-card">
                <div className="hp-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.rentocart.com/wp-content/uploads/2024/02/sony-playstation-5-disk-version-gaming-console-1-600x600-1.webp" alt="PS5" />
                </div>
                <div className="hp-foot">
                  <div className="hp-name">PlayStation 5</div>
                  <div style={{display:'flex',alignItems:'baseline',gap:4}}>
                    <span className="hp-price">₹120</span><span className="hp-per">/day</span>
                  </div>
                </div>
              </div>

              {/* Projector — bottom right */}
              <div className="hp-card">
                <div className="hp-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.rentocart.com/wp-content/uploads/2024/11/Epson-Projector-3300-Lumens.png" alt="Projector" />
                </div>
                <div className="hp-foot">
                  <div className="hp-name">Epson Projector 3300L</div>
                  <div style={{display:'flex',alignItems:'baseline',gap:4}}>
                    <span className="hp-price">₹450</span><span className="hp-per">/day</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Stats strip */}
            <div className="hero-stats-strip">
              <div className="hss-item"><div className="hss-val">50K+</div><div className="hss-lbl">Happy Customers</div></div>
              <div className="hss-sep" />
              <div className="hss-item"><div className="hss-val">4.8★</div><div className="hss-lbl">Average Rating</div></div>
              <div className="hss-sep" />
              <div className="hss-item"><div className="hss-val">24h</div><div className="hss-lbl">Delivery</div></div>
              <div className="hss-sep" />
              <div className="hss-item"><div className="hss-val">9</div><div className="hss-lbl">Cities</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].flatMap(() => [
            ['💻','Laptops & MacBooks'],['📺','Smart TVs'],['🎮','Gaming Consoles'],
            ['📡','Projectors'],['📷','Cameras & GoPro'],['🌬️','Air Purifiers'],
            ['🎤','Audio Systems'],['📱','Tablets & iPads'],['🖨️','Printers'],['💼','Office Equipment'],
          ]).map(([icon, label], i) => (
            <span key={i} style={{display:'flex',alignItems:'center',gap:8}}>
              {i > 0 && <span className="mq-sep" />}
              <span className="mq-item"><span>{icon}</span>{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section cats-sec" id="categories">
        <div className="container">
          <div className="sec-row">
            <div>
              <span className="eyebrow">Browse Categories</span>
              <h2 className="h2">Everything in one <span className="teal">rental stop</span></h2>
            </div>
            <a href="#" className="see-all">View all →</a>
          </div>
          <div className="bento-grid">
            {/* Laptops · wide teal */}
            <div className="bento-card bento-wide">
              <div className="bw-text">
                <div className="bw-eyebrow">240+ items</div>
                <div className="bw-name">Laptops &<br />MacBooks</div>
                <span className="bw-link">Explore all →</span>
              </div>
              <div className="bw-img-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.rentocart.com/wp-content/uploads/2024/05/MacBook-Air-M1-8GB-RAM-256-GB-SSD.jpg" alt="Laptops" />
              </div>
            </div>
            {[
              { img: 'https://www.rentocart.com/wp-content/uploads/2024/02/sony-playstation-5-disk-version-gaming-console-1-600x600-1.webp', name: 'Gaming',  count: '60+', blend: true  },
              { img: 'https://www.rentocart.com/wp-content/uploads/2026/02/GoPro-hero-13.jpg.jpeg',                                          name: 'Cameras', count: '75+', blend: true  },
              { img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop&q=85&auto=format',                    name: 'Television', count: '85+', blend: false },
              { img: 'https://www.rentocart.com/wp-content/uploads/2024/11/Epson-Projector-3300-Lumens.png',                                  name: 'Projectors', count: '45+', blend: true  },
            ].map(c => (
              <div key={c.name} className="bento-card bc-white">
                <div className="bc-img-zone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.name} className={c.blend ? 'blend' : 'no-blend'} />
                </div>
                <div className="bc-foot"><div className="bc-foot-name">{c.name}</div><div className="bc-foot-count">{c.count}+ items</div></div>
              </div>
            ))}
            {/* Appliances · wide teal */}
            <div className="bento-card bento-wide">
              <div className="bw-text">
                <div className="bw-eyebrow">150+ items</div>
                <div className="bw-name">Appliances &<br />Air Purifiers</div>
                <span className="bw-link">Explore all →</span>
              </div>
              <div className="bw-img-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.rentocart.com/wp-content/uploads/2024/05/Honeywell-Air-Touch-V3-Air-Purifier-1.jpg" alt="Appliances" />
              </div>
            </div>
            {[
              { img: 'https://www.rentocart.com/wp-content/uploads/2024/06/Carvaan-Saregama-Musicbar-Karaoke-on-rent-in-Kolkata-600x600.jpg', name: 'Audio',    count: '90+',  blend: true  },
              { img: 'https://www.rentocart.com/wp-content/uploads/2025/12/original-imaguyf2e6rbsnrf.webp',                                    name: 'Tablets',  count: '70+',  blend: false },
              { img: 'https://www.rentocart.com/wp-content/uploads/2025/01/paper-shredder-8-sheet-cross-cut-1.jpg',                             name: 'Printers', count: '55+',  blend: false },
              { img: 'https://www.rentocart.com/wp-content/uploads/2024/05/Samsung-Microwave-Oven-and-Prestige-Induction-Cooker.jpg',           name: 'Kitchen',  count: '120+', blend: false },
            ].map(c => (
              <div key={c.name} className="bento-card bc-white">
                <div className="bc-img-zone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.name} className={c.blend ? 'blend' : 'no-blend'} />
                </div>
                <div className="bc-foot"><div className="bc-foot-name">{c.name}</div><div className="bc-foot-count">{c.count} items</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="section products-sec" id="products">
        <div className="container">
          <div className="sec-row">
            <div>
              <span className="eyebrow">Top Picks</span>
              <h2 className="h2">Trending rentals <span className="orange">this week</span></h2>
            </div>
            <a href="#" className="see-all">View all →</a>
          </div>
          <div className="filter-chips">
            {CHIPS.map(c => (
              <button key={c} className={`chip${chip===c?' on':''}`} onClick={() => setChip(c)}>{c}</button>
            ))}
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => (
              <div key={p.id} className="p-card">
                <div className={`p-img ${p.tint}`}>
                  <span className={`p-badge ${p.badge}`}>{p.badge==='hot'?'🔥 HOT':p.badge==='new'?'✨ NEW':'⭐ POPULAR'}</span>
                  <button className="p-wish" onClick={() => toggleWish(p.id)}>{wishlist.has(p.id) ? '❤️' : '🤍'}</button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="p-body">
                  <div className="p-cat">{p.cat}</div>
                  <div className="p-name">{p.name}</div>
                  <div className="p-price-row">
                    <span className="p-price">{p.price}</span>
                    <span className="p-unit">{p.period}</span>
                    {p.old && <span className="p-old">{p.old}</span>}
                  </div>
                  <div className="p-foot">
                    <div className="p-rating"><span className="star">★</span> {p.rating} <span style={{color:'var(--ink-3)'}}>({p.reviews})</span></div>
                    <button className="rent-btn">Rent Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section how-sec" id="how">
        <div className="container">
          <div className="how-top">
            <span className="eyebrow">Simple Process</span>
            <h2 className="h2">Rent in <span className="gt">4 easy steps</span></h2>
            <p className="lead">From browsing to doorstep delivery — the whole thing takes under 5 minutes.</p>
          </div>
          <div className="how-grid">
            <div className="how-line" />
            {[
              { n:'01', e:'🔍', t:'Browse & Select',   d:'Search 1,000+ products. Filter by city, duration, and budget.' },
              { n:'02', e:'🪪', t:'Quick KYC',          d:'5-minute paperless verification. Upload Aadhaar + PAN once — remembered forever.' },
              { n:'03', e:'🚀', t:'Fast Delivery',       d:'We deliver, install, and demo your rental within 24 hours. Zero hidden fees.' },
              { n:'04', e:'💳', t:'Pay & Enjoy',         d:'Pay only after satisfaction. UPI, cards, wallets. Upgrade or return anytime.' },
            ].map(s => (
              <div key={s.n} className="how-card">
                <div className="step-circle">{s.n}</div>
                <span className="step-emoji">{s.e}</span>
                <h3 className="step-title">{s.t}</h3>
                <p className="step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-banner">
        <div className="container">
          <div className="stats-grid">
            {[['50K+','Happy Customers'],['1,000+','Products Available'],['9','Cities Covered'],['4.8★','Average Rating']].map(([n,l]) => (
              <div key={l} className="stat-cell"><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CITIES ── */}
      <section className="section cities-sec" id="cities">
        <div className="container">
          <div className="sec-row">
            <div>
              <span className="eyebrow">We Deliver To</span>
              <h2 className="h2">Your city, <span className="teal">covered.</span></h2>
            </div>
            <a href="#" className="see-all">All cities →</a>
          </div>
          <div className="cities-mosaic">
            <div className="city-tile big">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=700&fit=crop&q=85&auto=format" alt="Bengaluru" />
              <div className="city-over">
                <span className="city-pill">⭐ Most Popular</span>
                <div className="city-name">Bengaluru</div>
                <div className="city-count">320+ products · 24hr delivery</div>
              </div>
            </div>
            {[
              { img:'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&h=280&fit=crop&q=85', name:'Mumbai',    count:'280+' },
              { img:'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&h=280&fit=crop&q=85', name:'Delhi NCR', count:'260+' },
              { img:'https://images.unsplash.com/photo-1580581096469-1b5d87e4b19a?w=500&h=280&fit=crop&q=85', name:'Hyderabad', count:'195+' },
              { img:'https://images.unsplash.com/photo-1545566994-ced23c2f2d0c?w=500&h=280&fit=crop&q=85',    name:'Pune',      count:'160+' },
              { img:'https://images.unsplash.com/photo-1555921015-5532091f6026?w=500&h=280&fit=crop&q=85',    name:'Kolkata',   count:'175+' },
            ].map(c => (
              <div key={c.name} className="city-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} />
                <div className="city-over">
                  <div className="city-name">{c.name}</div>
                  <div className="city-count">{c.count} products</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY RENT ── */}
      <section className="section why-sec">
        <div className="container">
          <div className="why-inner">
            <div>
              <span className="eyebrow">Why RentoCart</span>
              <h2 className="h2">Renting is the <span className="teal">new owning</span></h2>
              <p className="lead">Stop buying depreciating assets. Rent premium products, upgrade whenever you want, save up to 80%.</p>
              <div className="why-feats">
                {[
                  { ico:'⬆️', cls:'fi-1', t:'Upgrade anytime — zero penalty',        d:'Switch to the latest model whenever you want. No lock-in, no resale headache.' },
                  { ico:'🛠️', cls:'fi-2', t:'Free maintenance & instant repair',      d:'We fix any issue for free within 4 hours. Zero downtime guaranteed.' },
                  { ico:'💰', cls:'fi-3', t:'Save up to 80% vs buying',               d:'Pay only for the duration you use. No depreciation, no storage cost.' },
                  { ico:'🔒', cls:'fi-4', t:'100% refundable security deposit',       d:'Returned within 48 hours of product return. No questions asked.' },
                ].map(f => (
                  <div key={f.t} className="why-feat">
                    <div className={`feat-ico ${f.cls}`}>{f.ico}</div>
                    <div><div className="feat-title">{f.t}</div><div className="feat-desc">{f.d}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="comp">
                <div className="comp-head">
                  <div className="comp-h">Feature</div>
                  <div className="comp-h">🟢 Rent</div>
                  <div className="comp-h">⚫ Buy</div>
                </div>
                {[
                  ['Upfront cost',        '✅ Low',     '❌ High'],
                  ['Free maintenance',    '✅ Always',  '❌ Your cost'],
                  ['Upgrade flexibility', '✅ Anytime', '❌ Resell first'],
                  ['Depreciation risk',   '✅ Zero',    '❌ High'],
                  ['Delivery & setup',    '✅ Free 24hr','⚠️ Extra'],
                  ['Eco-friendly',        '✅ Yes',     '❌ Adds waste'],
                  ['Cancel anytime',      '✅ Yes',     '❌ Permanent'],
                ].map(([f, r, b]) => (
                  <div key={f} className="comp-row">
                    <div className="comp-f">{f}</div>
                    <div className={`comp-c ${r.startsWith('✅')?'yes':r.startsWith('⚠️')?'mid':'no'}`}>{r}</div>
                    <div className={`comp-c ${b.startsWith('✅')?'yes':b.startsWith('⚠️')?'mid':'no'}`}>{b}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:20,textAlign:'center'}}>
                <a href="#products" className="btn btn-teal">Start Renting Today →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ECO ── */}
      <section className="section eco-sec">
        <div className="container">
          <div className="eco-inner">
            <div>
              <span className="eyebrow" style={{background:'#D1FAE5',color:'#059669'}}>🌿 Green Impact</span>
              <h2 className="h2">Every rental <span style={{color:'#10B981'}}>saves the planet</span></h2>
              <p className="lead">Renting keeps electronics in use longer, reduces manufacturing demand, and cuts e-waste. ISO 14001 certified.</p>
              <div className="eco-stats">
                {[['1L+','Kg CO₂ saved this month'],['8,400+','Products recirculated'],['ISO','14001 Certified']].map(([v,l]) => (
                  <div key={l} className="eco-stat"><div className="eco-sv">{v}</div><div className="eco-sl">{l}</div></div>
                ))}
              </div>
            </div>
            <div className="eco-vis">
              <div className="eco-ring">
                <div className="eco-center">
                  <div className="eco-earth">🌍</div>
                  <div className="eco-num">1,00,898</div>
                  <div className="eco-nlbl">Kg CO₂ saved</div>
                </div>
              </div>
              <div className="eco-bub eb1"><div className="eco-bv">♻️ 8,400+</div><div className="eco-bl">products recirculated</div></div>
              <div className="eco-bub eb2"><div className="eco-bv">🌱 Zero</div><div className="eco-bl">new e-waste</div></div>
              <div className="eco-bub eb3"><div className="eco-bv">⚡ ISO</div><div className="eco-bl">14001 certified</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testi-sec">
        <div className="container">
          <div className="testi-top">
            <span className="eyebrow">Reviews</span>
            <h2 className="h2">What renters <span className="teal">are saying</span></h2>
          </div>
          <div className="testi-grid">
            {[
              { featured:true,  stars:'★★★★★', txt:'Rented a MacBook for 3 months for a project. Saved ₹1.2L vs buying and got free support the entire time. This is genuinely the smartest way to work.',          av:'👨‍💼', name:'Arjun Mehta',   role:'Product Manager · Bengaluru' },
              { featured:false, stars:'★★★★★', txt:'Set up an entire home office — laptop, printer, webcam — delivered and installed within 24 hours. Completely seamless experience.',                               av:'👩‍💻', name:'Priya Krishnan', role:'Freelance Designer · Mumbai'  },
              { featured:false, stars:'★★★★★', txt:'We rented 40 laptops for a corporate training event. Flawless coordination, everything worked perfectly. Will use again for every event.',                        av:'🏢',   name:'Rohan Sharma',   role:'HR Manager · Delhi NCR'       },
              { featured:false, stars:'★★★★★', txt:'PS5 for my son\'s birthday party was a massive hit. Great condition, affordable, they helped with setup. Kids were overjoyed!',                                   av:'👨‍👧', name:'Vikram Nair',    role:'Hyderabad'                    },
              { featured:false, stars:'★★★★★', txt:'As a student who just moved to Bengaluru, renting made so much more sense than buying. Saved my first 3 months\' salary for actual living expenses.',             av:'🎓',   name:'Karthik Raj',    role:'Student · Bengaluru'          },
              { featured:false, stars:'★★★★★', txt:'GoPro Hero 13 for my trek was in pristine condition. Easy booking, on-time delivery. Deposit returned within 2 days. Excellent service.',                         av:'🏕️',  name:'Sneha Patel',    role:'Content Creator · Pune'       },
            ].map(t => (
              <div key={t.name} className={`t-card${t.featured?' featured':''}`}>
                <div className="t-stars">{t.stars}</div>
                <p className="t-txt">{t.txt}</p>
                <div className="t-author">
                  <div className="t-av">{t.av}</div>
                  <div><div className="t-name">{t.name}</div><div className="t-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP CTA ── */}
      <section className="app-sec">
        <div className="app-inner">
          <div>
            <div className="app-eyebrow">📱 Mobile App</div>
            <h2 className="app-h2">Rent from your phone,<br />anywhere, anytime</h2>
            <p className="app-desc">Browse, order, track delivery, and manage all your rentals from one beautiful app. Available on iOS &amp; Android.</p>
            <div className="app-btns">
              {[['🍎','Download on the','App Store'],['▶️','Get it on','Google Play']].map(([ico, sub, name]) => (
                <div key={name} className="app-store">
                  <span className="as-ico">{ico}</span>
                  <div><div className="as-sub">{sub}</div><div className="as-name">{name}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="app-vis">
            <div className={`app-phone app-phone-1`}>📋</div>
            <div className={`app-phone app-phone-main`}>📲</div>
            <div className={`app-phone app-phone-3`}>🛒</div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://www.rentocart.com/wp-content/uploads/2023/03/img_1345_720.png" alt="RentoCart" className="footer-logo-img" />
              <div className="footer-tagline">
                <span className="ftl-t">Rent</span><span className="ftl-s">·</span>
                <span className="ftl-o">Relax</span><span className="ftl-s">·</span>
                <span className="ftl-t">Return</span>
              </div>
              <p className="footer-desc">India&apos;s most trusted rental platform for premium electronics, appliances &amp; gadgets.</p>
              <div className="f-social">{['𝕏','in','f','▶'].map(s => <div key={s} className="f-soc">{s}</div>)}</div>
            </div>
            {[
              { h:'Products',  links:['Laptops & MacBooks','Televisions','Gaming Consoles','Projectors','Kitchen Appliances','Audio Systems'] },
              { h:'Company',   links:['About Us','How It Works','Partner With Us','Blog & News','Careers'] },
              { h:'Support',   links:['Help Center','KYC Guide','Delivery Info','Refund Policy','Contact Us'] },
            ].map(col => (
              <div key={col.h}>
                <div className="f-col-h">{col.h}</div>
                <div className="f-links">{col.links.map(l => <a key={l} className="f-link">{l}</a>)}</div>
              </div>
            ))}
            <div>
              <div className="f-col-h">Contact</div>
              <div className="f-contact">
                <div className="f-ci"><span className="f-ci-i">📞</span>+91 93303 91968</div>
                <div className="f-ci"><span className="f-ci-i">📧</span>hello@rentocart.com</div>
                <div className="f-ci"><span className="f-ci-i">📍</span>Bengaluru, India · 9 cities</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="f-copy">© 2024 RentoCart.com · All rights reserved.</div>
            <div className="f-certs">{['ISO 9001','ISO 14001','PCI-DSS'].map(c => <span key={c} className="f-cert">{c}</span>)}</div>
            <div className="f-legal"><a>Privacy Policy</a><a>Terms of Service</a><a>Cookie Policy</a></div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button className={`scroll-up${showTop?' show':''}`} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  )
}
