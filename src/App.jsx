import { useMemo, useRef, useState } from 'react'
import { MenuMovil, SaltarAlContenido, WhatsAppFlotante } from './sitio.jsx'
import Ubicacion from './ubicacion.jsx'
import { useSeccionActiva, wa } from './navegacion.js'
import { formatearCuenta, quietudActiva, useBandaScroll, useContador, useParallax, useRecorrido, useRevelados } from './motion.js'

const enlaces = [
  ['servicios', 'Servicios'],
  ['tarifas', 'Tarifas'],
  ['conductores', 'Conductores'],
  ['empresas', 'Empresas'],
  ['ubicacion', 'Ubicación'],
]

const factor = { Moto: 0.6, Auto: 1, Confort: 1.6 }

const rideTypes = [
  {
    name: 'Moto',
    tagline: 'Rápido y económico',
    price: 'Desde $2',
    time: '3-6 min',
    image: '/img/foto-1558981806ec52.jpg',
    features: ['Ideal para tráfico', 'Casco incluido', 'Viajes cortos'],
  },
  {
    name: 'Auto',
    tagline: 'Comodidad diaria',
    price: 'Desde $4',
    time: '4-8 min',
    image: '/img/sedan.jpg',
    features: ['Aire acondicionado', 'Conductores verificados', 'Pago móvil o efectivo'],
    featured: true,
  },
  {
    name: 'Confort',
    tagline: 'Traslados premium',
    price: 'Desde $7',
    time: '6-10 min',
    image: '/img/foto-15637202231851.jpg',
    features: ['Vehículos ejecutivos', 'Reservas programadas', 'Atención prioritaria'],
  },
]

const services = [
  {
    title: 'Taxi urbano',
    desc: 'Traslados dentro de Punto Fijo, Judibana, Puerta Maraven y zonas cercanas.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11" />
        <path d="M4 11h16v6H4z" />
        <circle cx="7.5" cy="17.8" r="1.6" />
        <circle cx="16.5" cy="17.8" r="1.6" />
      </svg>
    ),
  },
  {
    title: 'Aeropuerto',
    desc: 'Recogida y salida desde Las Piedras con seguimiento de horario y equipaje.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.5 3.5a1.5 1.5 0 0 1 3 0V9l7 4v2l-7-2v4l2.5 1.8V21L12 20l-4 1v-2.2L10.5 17v-4l-7 2v-2l7-4z" />
      </svg>
    ),
  },
  {
    title: 'Empresas',
    desc: 'Rutas corporativas, personal de guardia, visitas comerciales y traslados recurrentes.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M6 21V4l8-2v19" />
        <path d="M14 9h4v12" />
        <path d="M9 8h2M9 12h2M9 16h2" />
      </svg>
    ),
  },
  {
    title: 'Encomiendas express',
    desc: 'Documentos, compras pequeñas y entregas rápidas con confirmación por WhatsApp.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4z" />
        <path d="M3.5 7.5 12 11.5l8.5-4" />
        <path d="M12 11.5v9" />
      </svg>
    ),
  },
]

const zones = [
  ['Centro Punto Fijo', '$4'],
  ['Las Virtudes', '$5'],
  ['Judibana', '$8'],
  ['Puerta Maraven', '$7'],
  ['Aeropuerto Las Piedras', '$12'],
]

const drivers = [
  {
    name: 'Luis Medina',
    role: 'Conductor Confort',
    rating: '4.98',
    trips: '3.240 viajes',
    image: '/img/foto-15602500970b93.jpg',
    id: 'PF-041',
  },
  {
    name: 'María Rivas',
    role: 'Taxi urbano',
    rating: '4.96',
    trips: '2.870 viajes',
    image: '/img/foto-1494790108377b.jpg',
    id: 'PF-042',
  },
  {
    name: 'Carlos Vera',
    role: 'Moto express',
    rating: '4.94',
    trips: '4.110 viajes',
    image: '/img/foto-15006487677910.jpg',
    id: 'PF-043',
  },
]

const stats = [
  { valor: 12, sufijo: 'k+', etiqueta: 'viajes completados' },
  { valor: 4.9, decimales: 1, sufijo: '★', etiqueta: 'valoración media' },
  { valor: 6, sufijo: '', etiqueta: 'minutos de llegada' },
  { valor: 480, sufijo: ' mil', etiqueta: 'km recorridos' },
]

function LetreroTecho({ texto = 'TAXI', encendido = false, decorativo = false, className = '' }) {
  const largo = texto.length > 3
  return (
    <svg
      viewBox="0 0 360 140"
      className={className}
      aria-hidden={decorativo ? 'true' : undefined}
      role={decorativo ? undefined : 'img'}
      aria-label={decorativo ? undefined : `Letrero de techo de un taxi: ${texto}`}
    >
      <g className={encendido ? 'taxi-luz' : undefined}>
        <rect x="34" y="14" width="292" height="80" rx="8" fill="#18181b" stroke="#fcd34d" strokeWidth="4" />
        <rect x="52" y="30" width="256" height="48" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
        <text
          x={largo ? 185 : 183}
          y="66"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          fontSize={largo ? 40 : 44}
          fontWeight="700"
          letterSpacing={largo ? 12 : 6}
          fill="#fcd34d"
        >
          {texto}
        </text>
      </g>
      <path d="M146 94h68l16 30H130z" fill="#27272a" />
      <path d="M118 126h124" stroke="#3f3f46" strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}

function BandaDamero({ className = '', animada = true, referencia }) {
  return <div ref={referencia} aria-hidden="true" className={`damero ${animada ? 'damero-marquesina' : ''} border-y-2 border-zinc-950 ${className}`} />
}

function Contador({ valor, decimales = 0, sufijo = '' }) {
  const [nodo, mostrado] = useContador(valor)
  return <span ref={nodo}>{formatearCuenta(mostrado, decimales) + sufijo}</span>
}

function App() {
  const [activeRide, setActiveRide] = useState('Auto')
  const selectedRide = useMemo(() => rideTypes.find((ride) => ride.name === activeRide) || rideTypes[1], [activeRide])
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [incompleto, setIncompleto] = useState(false)
  const activa = useSeccionActiva(enlaces.map(([id]) => id))
  const fotoHeroe = useRef(null)
  const bandaDamero = useRef(null)
  const tramoRuta = useRef(null)

  useRevelados()
  useParallax(fotoHeroe)
  useBandaScroll(bandaDamero)
  useRecorrido(tramoRuta)

  const zona = zones.find(([nombre]) => nombre.toLowerCase() === destino.trim().toLowerCase())
  const estimado = zona ? `$${(Number(zona[1].slice(1)) * factor[activeRide]).toFixed(2).replace(/\.00$/, '')}` : null

  const mensajeViaje = [
    `Hola, quiero pedir un viaje en ${activeRide}.`,
    origen.trim() && `Origen: ${origen.trim()}`,
    destino.trim() && `Destino: ${destino.trim()}`,
    estimado && `Tarifa estimada: ${estimado}`,
  ]
    .filter(Boolean)
    .join('\n')

  const solicitar = (event) => {
    if (!origen.trim() || !destino.trim()) {
      event.preventDefault()
      setIncompleto(true)
      document.getElementById(origen.trim() ? 'viaje-destino' : 'viaje-origen')?.focus()
    }
  }

  const irAlCotizador = (cambios) => {
    if (cambios.ride) setActiveRide(cambios.ride)
    if (cambios.destino) setDestino(cambios.destino)
    document.getElementById('cotizador')?.scrollIntoView({ behavior: quietudActiva() ? 'auto' : 'smooth', block: 'center' })
  }

  return (
    <div className="min-h-screen bg-taxi-cream text-zinc-950 antialiased">
      <SaltarAlContenido className="focus:rounded-none focus:bg-zinc-950 focus:text-amber-300" />

      <div className="border-b-2 border-zinc-950 bg-zinc-950 font-mono text-amber-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] md:px-8 md:text-[11px]">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            Taxímetro libre
          </span>
          <span className="hidden sm:inline">Bandera $2,00</span>
          <span className="hidden md:inline">Unidad 012 · Punto Fijo</span>
          <span className="hidden lg:inline">Atención 24/7</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b-2 border-zinc-950 bg-taxi-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-5 lg:px-8">
          <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label="RutaFija Black inicio">
            <LetreroTecho texto="RF" decorativo className="h-auto w-[74px]" />
            <span>
              <span className="block font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">RutaFija Black</span>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-600">Taxi & transfer</span>
            </span>
          </a>

          <nav aria-label="Principal" className="ml-auto hidden items-center gap-1 font-mono text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 lg:flex">
            {enlaces.map(([id, texto]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activa === id ? 'true' : undefined}
                className={`border-2 px-4 py-2.5 transition ${activa === id ? 'border-zinc-950 bg-zinc-950 text-amber-300' : 'border-transparent hover:border-zinc-300 hover:text-zinc-950'}`}
              >
                {texto}
              </a>
            ))}
          </nav>

          <a href="#cotizador" className="ml-auto hidden border-2 border-zinc-950 bg-zinc-950 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-amber-300 transition hover:-translate-y-0.5 hover:bg-amber-300 hover:text-zinc-950 active:scale-[.98] sm:inline-flex lg:ml-0">
            Pedir taxi
          </a>
          <div className="ml-auto sm:ml-0">
            <MenuMovil
              enlaces={enlaces}
              activa={activa}
              cta={{ href: '#cotizador', texto: 'Pedir taxi' }}
              tono={{
                boton: 'border-2 border-zinc-950 bg-white text-zinc-950',
                panel: 'border-zinc-950 bg-taxi-cream text-zinc-950',
                activo: 'text-amber-800',
                cta: 'bg-zinc-950 text-amber-300',
              }}
            />
          </div>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="relative isolate overflow-hidden bg-zinc-950 text-white">
          <img
            ref={fotoHeroe}
            src="/img/foto-1490650404312a.jpg"
            alt="Taxi circulando de noche por una avenida iluminada"
            className="absolute inset-0 -z-30 h-full w-full object-cover opacity-30 will-change-transform"
          />
          <div aria-hidden="true" className="plano-calles absolute inset-0 -z-20 opacity-60" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_14%,rgba(251,191,36,.3),transparent_28%),linear-gradient(115deg,#09090b_0%,rgba(9,9,11,.96)_46%,rgba(39,39,42,.5)_100%)]" />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-14 lg:grid-cols-[1.04fr_.96fr] lg:gap-14 lg:px-8">
            <div className="max-w-3xl pt-4">
              <LetreroTecho texto="TAXI" encendido className="h-auto w-44 sm:w-52 md:w-56" />
              <p className="mt-7 inline-block border-2 border-amber-300/40 bg-amber-300/10 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-amber-200">
                Punto Fijo · Falcón · 24/7
              </p>
              <h1 className="mt-5 text-5xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                Tu taxi en Punto Fijo con la tarifa clara antes de subir
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                Taxis urbanos, motos rápidas, traslados al aeropuerto y rutas corporativas con conductores verificados, tarifas claras y atención directa por WhatsApp.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#cotizador" className="inline-flex items-center justify-center border-2 border-amber-300 bg-amber-300 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-zinc-950 shadow-[6px_6px_0_0_rgba(252,211,77,.32)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[8px_9px_0_0_rgba(252,211,77,.45)]">
                  Cotizar mi viaje
                </a>
                <a href="#tarifas" className="inline-flex items-center justify-center border-2 border-white/30 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10">
                  Ver tarifas
                </a>
              </div>

              <div data-reveal className="mt-11 grid max-w-xl grid-cols-2 border-2 border-white/15 bg-black/55 backdrop-blur-xl sm:grid-cols-4">
                {stats.map((stat, indice) => (
                  <div
                    key={stat.etiqueta}
                    className={`border-white/10 p-5 ${indice === stats.length - 1 ? '' : 'sm:border-r-2'} ${indice % 2 === 0 ? 'border-r-2' : ''} ${indice < 2 ? 'border-b-2 sm:border-b-0' : ''}`}
                  >
                    <strong className="tabular block font-mono text-2xl font-bold text-amber-300">
                      <Contador valor={stat.valor} decimales={stat.decimales ?? 0} sufijo={stat.sufijo} />
                    </strong>
                    <span className="mt-1 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">{stat.etiqueta}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="cotizador" data-reveal className="relative z-20 scroll-mt-28 border-2 border-zinc-700 bg-zinc-900 p-3 shadow-[10px_10px_0_0_rgba(0,0,0,.5)] lg:-mb-20">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Taxímetro 012
                </span>
                <span className="text-amber-400/80">Bandera $2,00</span>
              </div>

              <div className="border-2 border-zinc-800 bg-taxi-lcd px-4 py-3">
                <div className="flex items-end justify-between gap-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/80">
                    {estimado ? 'Tarifa estimada' : 'Tarifa en espera'}
                  </span>
                  <span aria-live="polite" className="lcd tabular font-mono text-4xl font-bold text-amber-300 sm:text-5xl">
                    <span key={estimado ?? 'espera'} className="lcd-parpadeo">
                      {estimado ? estimado.replace('$', '') : '--,--'}
                    </span>
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-amber-400/20 pt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400/70">
                  <span>USD</span>
                  <span>{selectedRide.name} · {selectedRide.time}</span>
                </div>
              </div>

              <div className="mt-3 bg-taxi-cream p-5 text-zinc-950">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">Cotizador rápido</p>
                    <h2 className="mt-1 text-2xl font-black tracking-tight">¿A dónde vamos?</h2>
                  </div>
                  <span className="shrink-0 border-2 border-zinc-950 bg-zinc-950 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-amber-300">llega en {selectedRide.time}</span>
                </div>

                <div className="space-y-3">
                  <label className={`flex items-center gap-3 border-2 bg-white px-4 py-3 transition focus-within:border-zinc-950 ${incompleto && !origen.trim() ? 'border-red-600' : 'border-zinc-300'}`}>
                    <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-amber-400" />
                    <span className="sr-only">Origen</span>
                    <input id="viaje-origen" value={origen} onChange={(event) => setOrigen(event.target.value)} aria-invalid={incompleto && !origen.trim()} className="w-full bg-transparent font-mono text-sm font-semibold outline-none placeholder:text-zinc-500" placeholder="Origen: Av. Jacinto Lara" />
                  </label>
                  <label className={`flex items-center gap-3 border-2 bg-white px-4 py-3 transition focus-within:border-zinc-950 ${incompleto && !destino.trim() ? 'border-red-600' : 'border-zinc-300'}`}>
                    <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-zinc-950" />
                    <span className="sr-only">Destino</span>
                    <input id="viaje-destino" list="zonas-frecuentes" value={destino} onChange={(event) => setDestino(event.target.value)} aria-invalid={incompleto && !destino.trim()} className="w-full bg-transparent font-mono text-sm font-semibold outline-none placeholder:text-zinc-500" placeholder="Destino: Aeropuerto Las Piedras" />
                    <datalist id="zonas-frecuentes">
                      {zones.map(([nombre]) => <option key={nombre} value={nombre} />)}
                    </datalist>
                  </label>
                  {incompleto && (!origen.trim() || !destino.trim()) && (
                    <p role="alert" className="px-1 font-mono text-xs font-bold text-red-700">Escribe {!origen.trim() ? 'desde dónde sales' : 'a dónde vas'} para enviarte la tarifa.</p>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {rideTypes.map((ride) => (
                    <button
                      key={ride.name}
                      type="button"
                      aria-pressed={activeRide === ride.name}
                      onClick={() => setActiveRide(ride.name)}
                      className={`border-2 p-3 text-left transition ${activeRide === ride.name ? 'border-zinc-950 bg-zinc-950 text-amber-300' : 'border-zinc-300 bg-white hover:-translate-y-0.5 hover:border-amber-400'}`}
                    >
                      <span className="block font-mono text-sm font-bold uppercase tracking-wide">{ride.name}</span>
                      <span className="mt-1 block font-mono text-[11px] font-bold opacity-75">{ride.time}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 border-2 border-zinc-950 bg-white">
                  <div className="relative overflow-hidden border-b-2 border-dashed border-zinc-950">
                    <img src={selectedRide.image} alt={`Vehículo ${selectedRide.name} de RutaFija`} className="h-48 w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-end justify-between gap-4 border-b-2 border-dotted border-zinc-300 pb-4">
                      <div>
                        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-600">{selectedRide.tagline}</p>
                        <h3 className="mt-1 text-2xl font-black">{selectedRide.name}</h3>
                      </div>
                      <div className="text-right">
                        <strong className="tabular block font-mono text-2xl font-bold">{estimado ?? selectedRide.price}</strong>
                        <span className="font-mono text-[11px] font-bold text-zinc-600">{estimado ? `hasta ${zona[0]}` : 'elige un destino frecuente'}</span>
                      </div>
                    </div>
                    <a href={wa(mensajeViaje)} onClick={solicitar} className="mt-5 inline-flex w-full justify-center border-2 border-zinc-950 bg-amber-300 px-5 py-3 font-mono text-sm font-bold uppercase tracking-wide text-zinc-950 transition hover:-translate-y-0.5 hover:bg-zinc-950 hover:text-amber-300 active:scale-[.98]">
                      Solicitar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-24">
            <BandaDamero referencia={bandaDamero} animada={false} className="h-12 border-b-0" />
          </div>
        </section>

        <section id="servicios" className="bg-taxi-cream py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div data-reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-amber-800">Tablero de servicios</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Un servicio para cada traslado</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-zinc-600">Del viaje corto al centro al traslado de madrugada al aeropuerto: mismo número, mismo trato.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {services.map((service, indice) => (
                <article key={service.title} data-reveal style={{ '--retardo': indice + 1 }} className="border-2 border-zinc-950 bg-zinc-950 p-6 text-white shadow-[6px_6px_0_0_#fcd34d] transition hover:-translate-y-1 hover:shadow-[6px_11px_0_0_#fcd34d]">
                  <span aria-hidden="true" className="mb-6 grid h-11 w-11 place-items-center border-2 border-amber-300/50 text-amber-300">{service.icon}</span>
                  <h3 className="font-mono text-base font-bold uppercase tracking-[0.08em]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{service.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tarifas" className="relative isolate overflow-hidden bg-zinc-950 py-24 text-white">
          <div aria-hidden="true" className="plano-calles absolute inset-0 -z-10 opacity-50" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div data-reveal className="mb-14 text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-amber-300">Recibos del taxímetro</p>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Elige cómo moverte</h2>
            </div>

            <div className="grid gap-9 lg:grid-cols-3">
              {rideTypes.map((ride, indice) => (
                <article
                  key={ride.name}
                  data-reveal
                  style={{ '--retardo': indice + 1 }}
                  className="recibo flex flex-col border-2 border-zinc-950 bg-taxi-cream text-zinc-950 shadow-[10px_10px_0_0_#fcd34d] transition duration-300 hover:-translate-y-1.5 hover:shadow-[10px_16px_0_0_#fcd34d]"
                >
                  <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-zinc-950 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                    <span>Recibo No. 00{indice + 1}</span>
                    <span className="text-zinc-600">Unidad 012</span>
                  </div>
                  <div className="relative overflow-hidden border-b-2 border-dashed border-zinc-950">
                    <img src={ride.image} alt={`Vehículo ${ride.name} de RutaFija`} className="h-44 w-full object-cover" />
                    {ride.featured && (
                      <span className="absolute left-4 top-4 -rotate-6 border-2 border-amber-800 bg-taxi-cream/95 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-amber-800">
                        Más solicitado
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-600">{ride.tagline}</p>
                    <div className="mt-2 flex items-end justify-between gap-3 border-b-2 border-dotted border-zinc-300 pb-4">
                      <h3 className="text-3xl font-bold">{ride.name}</h3>
                      <strong className="tabular font-mono text-2xl font-bold">{ride.price}</strong>
                    </div>
                    <ul className="mb-6 mt-5 space-y-2.5 font-mono text-[13px] text-zinc-700">
                      {ride.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span aria-hidden="true" className="font-bold text-amber-800">+</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button type="button" onClick={() => irAlCotizador({ ride: ride.name })} className="mt-auto inline-flex w-full justify-center border-2 border-zinc-950 bg-zinc-950 px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.1em] text-amber-300 transition hover:bg-amber-300 hover:text-zinc-950 active:scale-[.98]">
                      Elegir {ride.name}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t-2 border-dashed border-zinc-950 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-600">
                    <span>Tarifa base incluida</span>
                    <span>Espera {ride.time}</span>
                  </div>
                </article>
              ))}
            </div>

            <div
              ref={tramoRuta}
              data-recorrido
              data-reveal
              style={{ '--retardo': 4 }}
              className="mt-16 grid border-2 border-zinc-950 bg-taxi-cream text-zinc-950 shadow-[10px_10px_0_0_#fcd34d] lg:grid-cols-[.85fr_1.15fr]"
            >
              <div className="border-b-2 border-dashed border-zinc-950 p-8 lg:border-b-0 lg:border-r-2 lg:p-10">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-amber-800">Tarifas referenciales</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight">Rutas frecuentes</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-600">Tarifa de Auto desde el centro. Toca una ruta y la llevamos al cotizador con el precio de Moto o Confort.</p>
              </div>
              <div className="bg-white">
                {zones.map(([zone, price]) => (
                  <button type="button" key={zone} onClick={() => irAlCotizador({ destino: zone })} className="group flex w-full items-center gap-3 border-b-2 border-dotted border-zinc-200 px-6 py-4 text-left transition last:border-b-0 hover:bg-amber-300">
                    <span className="font-mono text-sm font-bold uppercase tracking-wide text-zinc-700 group-hover:text-zinc-950">{zone}</span>
                    <span aria-hidden="true" className="h-px flex-1 border-b border-dotted border-zinc-400 group-hover:border-zinc-950" />
                    <strong className="tabular font-mono text-lg font-bold">{price}</strong>
                    <span aria-hidden="true" className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-zinc-950">→</span>
                  </button>
                ))}
              </div>
              <div className="border-t-2 border-dashed border-zinc-950 px-6 py-5 lg:col-span-2">
                <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                  <span>Recorrido de la ruta</span>
                  <span className="text-amber-800">Centro · Aeropuerto</span>
                </div>
                <div className="recorrido" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section id="conductores" className="bg-taxi-cream py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div data-reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-amber-800">Credenciales del equipo</p>
                <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Conductores que generan confianza</h2>
              </div>
              <a href={wa('Hola, quiero trabajar como conductor en RutaFija Black.')} className="inline-flex w-fit border-2 border-zinc-950 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-zinc-950 transition hover:-translate-y-0.5 hover:bg-zinc-950 hover:text-amber-300">
                Unirme como conductor
              </a>
            </div>
            <div className="grid gap-7 md:grid-cols-3">
              {drivers.map((driver, indice) => (
                <article key={driver.name} data-reveal style={{ '--retardo': indice + 1 }} className="border-2 border-zinc-950 bg-white shadow-[8px_8px_0_0_#09090b] transition duration-300 hover:-translate-y-1.5 hover:shadow-[8px_14px_0_0_#09090b]">
                  <div className="flex items-center justify-between gap-3 bg-zinc-950 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
                    <span>Conductor verificado</span>
                    <span className="text-white/75">{driver.id}</span>
                  </div>
                  <img src={driver.image} alt={`${driver.name}, conductor de RutaFija`} className="aspect-[4/5] w-full object-cover object-top" />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black">{driver.name}</h3>
                        <p className="mt-1 text-sm font-bold text-zinc-600">{driver.role}</p>
                      </div>
                      <span className="tabular shrink-0 border-2 border-zinc-950 bg-amber-300 px-3 py-1 font-mono text-sm font-bold text-zinc-950">★ {driver.rating}</span>
                    </div>
                    <p className="mt-5 border-t border-dotted border-zinc-300 pt-4 font-mono text-xs text-zinc-600">{driver.trips} completados con historial verificado.</p>
                  </div>
                  <div aria-hidden="true" className="damero h-4 border-t-2 border-zinc-950" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="empresas" className="bg-zinc-950 px-5 py-24 text-white lg:px-8">
          <div className="mx-auto grid max-w-7xl border-2 border-amber-300/30 bg-[#0c0c0f] lg:grid-cols-[1fr_1fr]">
            <div data-reveal className="p-8 sm:p-12 lg:p-16">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-amber-300">Soluciones corporativas</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Rutas para equipos, hoteles, clínicas y comercios</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">Contratos mensuales para empresas que necesitan traslados recurrentes, reporte de viajes, facturación y unidades con prioridad.</p>
              <div className="mt-9 grid gap-3 font-mono text-[13px] text-zinc-300 sm:grid-cols-2">
                <span>✓ Reporte semanal de viajes</span>
                <span>✓ Conductores asignados</span>
                <span>✓ Tarifas por zona</span>
                <span>✓ Atención prioritaria</span>
              </div>
              <a href={wa('Hola, quiero una propuesta de traslados para mi empresa.')} className="mt-9 inline-flex border-2 border-amber-300 bg-amber-300 px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-zinc-950 transition hover:-translate-y-0.5 hover:border-white hover:bg-white">
                Solicitar propuesta
              </a>
            </div>
            <div className="relative min-h-[420px] border-t-2 border-amber-300/30 lg:border-l-2 lg:border-t-0">
              <img src="/img/foto-15686051170365.jpg" alt="Vehículo ejecutivo de RutaFija listo para un traslado corporativo" className="absolute inset-0 h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-transparent" />
              <span className="absolute bottom-6 right-6 -rotate-6 border-2 border-amber-300/70 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
                Cuenta corporativa
              </span>
            </div>
          </div>
        </section>

        <Ubicacion />
      </main>

      <footer className="bg-taxi-cream">
        <div aria-hidden="true" className="damero damero-marquesina h-6 border-b-2 border-zinc-950" />
        <div className="grid gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:mx-auto lg:max-w-7xl lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <LetreroTecho texto="RF" decorativo className="h-auto w-[74px]" />
              <div>
                <span className="block text-lg font-black">RutaFija Black</span>
                <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600">Taxi & transfer</span>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-600">Taxis, motos, unidades confort, traslados al aeropuerto, rutas de empresa y encomiendas express en Punto Fijo, a toda hora.</p>
          </div>
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Servicios</h3>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-zinc-600">
              <li><a href="#servicios" className="hover:text-zinc-950">Taxi urbano</a></li>
              <li><a href="#servicios" className="hover:text-zinc-950">Aeropuerto</a></li>
              <li><a href="#empresas" className="hover:text-zinc-950">Empresas</a></li>
              <li><a href="#tarifas" className="hover:text-zinc-950">Tarifas</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Contacto</h3>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-zinc-600">
              <li><a href="#ubicacion" className="hover:text-zinc-950">Punto Fijo, Falcón</a></li>
              <li><a href={wa()} className="hover:text-zinc-950">WhatsApp: +58 412-000-0000</a></li>
              <li>Atención 24/7</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t-2 border-dotted border-zinc-300 px-5 pt-7 text-center text-xs font-semibold text-zinc-600 lg:px-8">
          © 2026 RutaFija Black. Demo creada por Carlos Avila - Developer 🇻🇪 ·{' '}
          <a href="/privacidad/" className="underline underline-offset-2 hover:text-zinc-950">Privacidad</a>
        </div>
      </footer>
      <WhatsAppFlotante texto="Hola, necesito un taxi." className="border-2 border-zinc-950 bg-amber-300 text-zinc-950" />
    </div>
  )
}

export default App
