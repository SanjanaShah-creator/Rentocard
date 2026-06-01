'use client'

import { useEffect, useRef, useState } from 'react'

const CHIPS = ['All Products', 'Laptops', 'Gaming', 'Cameras', 'Projectors', 'Appliances', 'Tablets']
const CITIES = ['Bengaluru','Mumbai','Delhi NCR','Hyderabad','Pune','Kolkata','Chennai','Ahmedabad']

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
  const [scrolled, setScrolled]         = useState(false)
  const [showTop, setShowTop]           = useState(false)
  const [chip, setChip]                 = useState('All Products')
  const [wishlist, setWishlist]         = useState<Set<string>>(new Set())
  const [selectedCity, setSelectedCity] = useState('Bengaluru')
  const [cityOpen, setCityOpen]         = useState(false)
  const [heroCityOpen, setHeroCityOpen] = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const cityRef     = useRef<HTMLDivElement>(null)
  const heroCityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false)
      if (heroCityRef.current && !heroCityRef.current.contains(e.target as Node)) setHeroCityOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
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
            <div className={`nav-city${cityOpen ? ' open' : ''}`} onClick={() => setCityOpen(o => !o)} ref={cityRef}>
              <span className="live-dot" />{selectedCity} ▾
              <div className="city-dd">
                {CITIES.map(c => (
                  <button key={c} className={`city-dd-opt${c === selectedCity ? ' sel' : ''}`}
                    onClick={e => { e.stopPropagation(); setSelectedCity(c); setCityOpen(false) }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <a href="#" className="nav-login">Log In</a>
            <a href="#products" className="nav-cta">Rent Now →</a>
            <div className={`nav-ham${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(o => !o)}><span /><span /><span /></div>
          </div>
        </div>
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
          <ul className="mmenu-links">
            {['Home','Categories','Products','Cities','Partner With Us','Blog'].map((l, i) => (
              <li key={l}><a href={i===0?'#':i===1?'#categories':i===2?'#products':i===3?'#cities':'#'} className="mmenu-a" onClick={() => setMobileOpen(false)}>{l}</a></li>
            ))}
          </ul>
          <a href="#products" className="mmenu-cta" onClick={() => setMobileOpen(false)}>Rent Now →</a>
          <div className="mmenu-cities">
            <div className="mmenu-city-lbl">Select City</div>
            <div className="mmenu-city-grid">
              {CITIES.map(c => (
                <button key={c} className={`mmenu-city-btn${c === selectedCity ? ' sel' : ''}`}
                  onClick={() => { setSelectedCity(c); setMobileOpen(false) }}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">

        {/* Full-bleed background image */}
        <div className="hero-bg-img">
          <picture>
            <source media="(max-width: 640px)"  srcSet="/Hero%20Section%20Mobile.png" />
            <source media="(max-width: 1700px)" srcSet="/Hero%20section%20Tablet.png" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Hero%20Section%20Desktop.png" alt="Rent premium electronics" />
          </picture>
        </div>

        {/* Text — overlaid on the image, left side */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span className="badge-hi">New</span>
            <span className="badge-txt-full">&nbsp;— MacBook Pro M4 now available for rent</span>
            <span className="badge-txt-short">&nbsp;— MacBook Pro M4</span>
          </div>
          <h1 className="hero-h1">
            Rent Laptops, TVs<br />&amp; Premium Gear
          </h1>
          <p className="hero-desc">
            India&apos;s most trusted electronics rental platform.<br />Delivered to your door in under 24 hours.
          </p>
          <div className="hero-ctas">
            <a href="#products" className="hcta-p">Browse Products →</a>
            <a href="#how" className="hcta-g">How It Works</a>
          </div>
        </div>

        {/* Search bar — absolute bottom right */}
        <div className="hero-chip-bar">
          <div className={`hcb-field hcb-city${heroCityOpen ? ' open' : ''}`} onClick={() => setHeroCityOpen(o => !o)} ref={heroCityRef}>
            <span className="hcb-lbl"><span className="material-icons hcb-ico">location_on</span>Location</span>
            <span className="hcb-val">{selectedCity} ▾</span>
            <div className="hero-city-dd">
              {CITIES.map(c => (
                <button key={c} className={`city-dd-opt${c === selectedCity ? ' sel' : ''}`}
                  onClick={e => { e.stopPropagation(); setSelectedCity(c); setHeroCityOpen(false) }}>{c}</button>
              ))}
            </div>
          </div>
          <div className="hcb-sep" />
          <div className="hcb-field hcb-field--grow">
            <span className="hcb-lbl"><span className="material-icons hcb-ico">search</span>What do you need?</span>
            <input className="hcb-input" type="text" placeholder="Laptops, PS5, TV, projector…" />
          </div>
          <button className="hcb-btn">Find <span className="material-icons" style={{fontSize:'17px',verticalAlign:'middle'}}>arrow_forward</span></button>
        </div>

      </section>

      {/* ── MARQUEE — client logos ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[0,1].map(copy => (
            <div key={copy} className="mq-set">
              {[1,2,3,4,5,6,7,8,9,10].map(n => {
                const ext = [1,3,5,7,9,10].includes(n) ? 'jpg' : 'png'
                return (
                  <span key={n} className="mq-logo-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/logo ${n}.${ext}`} alt={`client ${n}`} className="mq-logo" loading="eager" />
                  </span>
                )
              })}
            </div>
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
              { img: '/32-inches-HD-Ready-Smart-Android-LED-TV-1.jpg',                                                                        name: 'Television', count: '85+', blend: false },
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
              { img: 'https://www.rentocart.com/wp-content/uploads/2025/01/paper-shredder-8-sheet-cross-cut-1.jpg',                             name: 'Printers', count: '55+',  blend: true  },
              { img: 'https://www.rentocart.com/wp-content/uploads/2024/05/Samsung-Microwave-Oven-and-Prestige-Induction-Cooker.jpg',           name: 'Kitchen',  count: '120+', blend: true  },
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
              <h2 className="h2">Trending rentals <span className="teal">this week</span></h2>
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
                  <span className={`p-badge ${p.badge}`}><span className="material-icons" style={{fontSize:'11px',verticalAlign:'middle',marginRight:'3px'}}>{p.badge==='hot'?'local_fire_department':p.badge==='new'?'auto_awesome':'grade'}</span>{p.badge==='hot'?'HOT':p.badge==='new'?'NEW':'POPULAR'}</span>
                  <button className="p-wish" onClick={() => toggleWish(p.id)}><span className={`material-icons p-wish-ico${wishlist.has(p.id) ? ' active' : ''}`}>{wishlist.has(p.id) ? 'favorite' : 'favorite_border'}</span></button>
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
              { n:'01', e:'manage_search',   t:'Browse & Select',   d:'Search 1,000+ products. Filter by city, duration, and budget.' },
              { n:'02', e:'verified_user',   t:'Quick KYC',          d:'5-minute paperless verification. Upload Aadhaar + PAN once — remembered forever.' },
              { n:'03', e:'local_shipping',  t:'Fast Delivery',       d:'We deliver, install, and demo your rental within 24 hours. Zero hidden fees.' },
              { n:'04', e:'payment',         t:'Pay & Enjoy',         d:'Pay only after satisfaction. UPI, cards, wallets. Upgrade or return anytime.' },
            ].map(s => (
              <div key={s.n} className="how-card">
                <div className="step-circle">{s.n}</div>
                <span className="material-icons step-emoji">{s.e}</span>
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
              { img:'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=280&fit=crop&q=85', name:'Hyderabad', count:'195+' },
              { img:'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=500&h=280&fit=crop&q=85',    name:'Pune',      count:'160+' },
              { img:'/kolkata.jpg',                                                                                   name:'Kolkata',   count:'175+' },
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
                  { ico:'upgrade',    cls:'fi-1', t:'Upgrade anytime — zero penalty',        d:'Switch to the latest model whenever you want. No lock-in, no resale headache.' },
                  { ico:'build',      cls:'fi-2', t:'Free maintenance & instant repair',      d:'We fix any issue for free within 4 hours. Zero downtime guaranteed.' },
                  { ico:'savings',    cls:'fi-3', t:'Save up to 80% vs buying',               d:'Pay only for the duration you use. No depreciation, no storage cost.' },
                  { ico:'lock',       cls:'fi-4', t:'100% refundable security deposit',       d:'Returned within 48 hours of product return. No questions asked.' },
                ].map(f => (
                  <div key={f.t} className="why-feat">
                    <div className={`feat-ico ${f.cls}`}><span className="material-icons">{f.ico}</span></div>
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
              <div style={{marginTop:20}}>
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
                  <div className="eco-earth"><span className="material-icons">public</span></div>
                  <div className="eco-num">1,00,898</div>
                  <div className="eco-nlbl">Kg CO₂ saved</div>
                </div>
              </div>
              <div className="eco-bub eb1"><div className="eco-bv"><span className="material-icons" style={{fontSize:'16px',verticalAlign:'middle',marginRight:'4px'}}>recycling</span>8,400+</div><div className="eco-bl">products recirculated</div></div>
              <div className="eco-bub eb2"><div className="eco-bv"><span className="material-icons" style={{fontSize:'16px',verticalAlign:'middle',marginRight:'4px'}}>eco</span>Zero</div><div className="eco-bl">new e-waste</div></div>
              <div className="eco-bub eb3"><div className="eco-bv"><span className="material-icons" style={{fontSize:'16px',verticalAlign:'middle',marginRight:'4px'}}>bolt</span>ISO</div><div className="eco-bl">14001 certified</div></div>
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

      {/* ── BLOG ── */}
      <section className="section blog-sec">
        <div className="container">
          <div className="sec-row">
            <div>
              <span className="eyebrow">From The Blog</span>
              <h2 className="h2">Tips, guides &amp; <span className="teal">rental advice</span></h2>
            </div>
            <a href="#" className="see-all">All posts →</a>
          </div>
          <div className="blog-grid">
            {[
              {cat:'Guide',date:'May 12, 2026',read:'5 min',img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=280&fit=crop&q=80',title:'MacBook vs Windows Laptop: Which Should You Rent?',desc:'Not sure which laptop to rent for your next project? We break down pros and cons for every use case.'},
              {cat:'Tips',date:'Apr 28, 2026',read:'4 min',img:'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=280&fit=crop&q=80',title:'How to Save 80% on Electronics by Renting',desc:'Buying depreciating gadgets is expensive. Here\'s how smart professionals are switching to renting.'},
              {cat:'News',date:'Apr 10, 2026',read:'2 min',img:'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=280&fit=crop&q=80',title:'RentoCart Now Delivers Across 9 Cities in India',desc:'We\'ve expanded to Chennai and Ahmedabad! Premium electronics rentals now cover more of India than ever.'},
            ].map(p=>(
              <div key={p.title} className="blog-card">
                <div className="blog-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.title} className="blog-img" />
                </div>
                <div className="blog-body">
                  <div className="blog-top"><span className="blog-cat">{p.cat}</span><span className="blog-meta">{p.date} · {p.read} read</span></div>
                  <h3 className="blog-title">{p.title}</h3>
                  <p className="blog-desc">{p.desc}</p>
                  <a href="#" className="blog-link">Read more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section faq-sec">
        <div className="container">
          <div className="faq-head">
            <span className="eyebrow">Got Questions?</span>
            <h2 className="h2">Frequently asked <span className="teal">questions</span></h2>
          </div>
          <div className="faq-list">
            {[
              {q:'How does the rental process work?',a:'Browse 1,000+ products, complete a 5-minute paperless KYC, choose your duration, and we deliver within 24 hours. Pay only after satisfaction.'},
              {q:'What documents are needed for KYC?',a:'Just Aadhaar and PAN card. Our paperless verification takes under 5 minutes and is saved for all future rentals — no repeat uploads.'},
              {q:'Is the security deposit fully refundable?',a:'Yes — 100% refunded within 48 hours of returning the product. No deductions, no questions asked.'},
              {q:'What if the product gets damaged?',a:'We cover free maintenance and repair for all rentals. If something goes wrong, we fix or replace it within 4 hours at zero cost to you.'},
              {q:'Can I extend or upgrade my rental?',a:'Absolutely. Extend anytime from your dashboard. Want a newer model? Upgrade with zero penalty — just pay the difference in rental.'},
              {q:'How quickly is delivery after booking?',a:'We deliver, install, and demo within 24 hours across all 9 cities. Same-day delivery is available in Bengaluru for orders before 12 PM.'},
            ].map((item,i)=>(
              <details key={i} className="faq-item">
                <summary className="faq-q">{item.q}<span className="faq-icon">+</span></summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="app-sec">
        <div className="app-inner">
          <div>
            <div className="app-eyebrow">📬 Get In Touch</div>
            <h2 className="app-h2">Need help finding<br />the right gear?</h2>
            <p className="app-desc">Our rental experts will help you pick the perfect product, duration, and plan. We respond within 24 hours — no spam, just great advice.</p>
            <div className="app-trust">
              {[['✓','Expert rental advice'],['✓','Free delivery consultation'],['✓','Response within 24 hours']].map(([ico, txt]) => (
                <div key={txt} className="at-item"><span>{ico}</span>{txt}</div>
              ))}
            </div>
          </div>
          <div className="contact-glass">
            <div className="cg-row">
              <div className="cg-field">
                <label className="cg-lbl">Full Name</label>
                <input className="cg-inp" type="text" placeholder="Arjun Mehta" />
              </div>
              <div className="cg-field">
                <label className="cg-lbl">Phone Number</label>
                <input className="cg-inp" type="tel" placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="cg-row">
              <div className="cg-field">
                <label className="cg-lbl">Your City</label>
                <select className="cg-inp">
                  {['Bengaluru','Mumbai','Delhi NCR','Hyderabad','Pune','Kolkata','Chennai','Ahmedabad'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="cg-field">
                <label className="cg-lbl">What to Rent?</label>
                <input className="cg-inp" type="text" placeholder="MacBook, PS5, Projector..." />
              </div>
            </div>
            <div className="cg-field">
              <label className="cg-lbl">Message (optional)</label>
              <textarea className="cg-inp cg-ta" placeholder="Share your duration, budget, or any special requirements..." />
            </div>
            <button className="cg-btn">Send Enquiry →</button>
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
      <button className={`scroll-up${showTop?' show':''}`} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}><span className="material-icons">keyboard_arrow_up</span></button>
    </>
  )
}
