import { useRef } from 'react'
import { wa } from './navegacion.js'
import { useRutaMapa } from './motion.js'

const comoLlegar = 'https://www.google.com/maps/search/?api=1&query=Punto+Fijo+Falcón+Venezuela'

const verticales = [75, 205, 345, 490, 630, 745]
const horizontales = [62, 158, 356, 462]
const avenida = 254
const trazo = 'M75 520 L75 254 L490 254'
const edificios = [
  [94, 81, 92, 58],
  [94, 281, 92, 56],
  [224, 375, 102, 68],
  [364, 375, 60, 68],
  [432, 375, 39, 68],
  [509, 81, 58, 58],
  [575, 81, 36, 58],
  [509, 281, 102, 56],
]

function MapaBase({ ruta }) {
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Mapa ilustrativo de la base de RutaFija en Punto Fijo, con la ruta hasta el punto de recogida" className="block h-auto w-full">
      <defs>
        <filter id="sombra-mapa" x="-40%" y="-40%" width="180%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#202124" floodOpacity="0.3" />
        </filter>
      </defs>

      <rect width="800" height="520" fill="#e8eaed" />
      <rect x="354" y="167" width="127" height="68" fill="#c5e8b7" />
      <rect x="639" y="365" width="97" height="88" rx="4" fill="#aadaff" />
      {edificios.map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="2" fill="#dfe1e5" />
      ))}

      <g stroke="#dadce0" strokeLinecap="square">
        {verticales.map((x) => (
          <line key={`borde-v-${x}`} x1={x} y1="0" x2={x} y2="520" strokeWidth="18" />
        ))}
        {horizontales.map((y) => (
          <line key={`borde-h-${y}`} x1="0" y1={y} x2="800" y2={y} strokeWidth="18" />
        ))}
        <line x1="0" y1={avenida} x2="800" y2={avenida} strokeWidth="36" />
      </g>

      <g stroke="#ffffff">
        {verticales.map((x) => (
          <line key={`calle-v-${x}`} x1={x} y1="0" x2={x} y2="520" strokeWidth="16" />
        ))}
        {horizontales.map((y) => (
          <line key={`calle-h-${y}`} x1="0" y1={y} x2="800" y2={y} strokeWidth="16" />
        ))}
        <line x1="0" y1={avenida} x2="800" y2={avenida} strokeWidth="32" />
      </g>
      <line x1="0" y1={avenida} x2="800" y2={avenida} stroke="#fcd34d" strokeWidth="3" strokeDasharray="20 18" />

      <g ref={ruta} className="mapa-ruta" aria-hidden="true">
        <path d={trazo} pathLength="100" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d={trazo} pathLength="100" fill="none" stroke="#4285f4" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <text x="776" y="505" textAnchor="end" fontSize="15" fontWeight="600" fill="#5f6368" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif">
        Punto Fijo · Falcón
      </text>

      <ellipse cx="490" cy="256" rx="13" ry="4.5" fill="rgba(60,64,67,0.3)" />
      <g transform="translate(475 226.5) scale(1.25)">
        <g className="mapa-pin">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ea4335" />
          <circle cx="12" cy="9" r="2.6" fill="#ffffff" />
        </g>
      </g>

      <g filter="url(#sombra-mapa)">
        <rect x="520" y="235" width="176" height="38" rx="8" fill="#ffffff" />
        <text x="536" y="260" fontSize="17" fontWeight="600" fill="#202124" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif">
          RutaFija · Base
        </text>
      </g>
    </svg>
  )
}

function Dato({ etiqueta, valor, href }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">{etiqueta}</dt>
      <dd className="text-right font-mono text-[13px] font-semibold text-white">
        {href ? (
          <a href={href} className="text-amber-300 underline underline-offset-2 transition hover:text-white">{valor}</a>
        ) : (
          valor
        )}
      </dd>
    </div>
  )
}

export default function Ubicacion() {
  const ruta = useRef(null)
  useRutaMapa(ruta)

  return (
    <section id="ubicacion" className="bg-taxi-cream py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-amber-800">Base de operaciones</p>
            <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Encuéntranos en Punto Fijo</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-zinc-600">Salimos desde la base a toda hora: centro de Punto Fijo, Judibana, Puerta Maraven y el aeropuerto de Las Piedras.</p>
        </div>

        <div data-reveal className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
          <div className="border-2 border-zinc-950 bg-white shadow-[8px_8px_0_0_#09090b]">
            <div className="flex items-center justify-between gap-3 border-b-2 border-zinc-950 bg-zinc-950 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
              <span>Unidad 012 · Base</span>
              <span className="text-white/75">Punto Fijo</span>
            </div>
            <MapaBase ruta={ruta} />
          </div>

          <div className="flex flex-col border-2 border-zinc-950 bg-zinc-950 text-white shadow-[8px_8px_0_0_#fcd34d]">
            <div className="flex items-center justify-between gap-3 border-b-2 border-amber-300/40 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
              <span>Taxímetro libre</span>
              <span>24/7</span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/80">Punto de recogida</p>
              <h3 className="mt-2 text-3xl font-black">RutaFija · Base</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">Punto Fijo, Falcón. La unidad 012 sale a cualquier hora hacia el centro, las zonas cercanas o el aeropuerto.</p>

              <dl className="mt-6 space-y-4 border-t border-dotted border-zinc-700 pt-5">
                <Dato etiqueta="Dirección" valor="Punto Fijo, Falcón" />
                <Dato etiqueta="Horario" valor="Atención 24/7" />
                <Dato etiqueta="Zonas" valor="Centro · Judibana · Aeropuerto" />
                <Dato etiqueta="WhatsApp" valor="+58 412-000-0000" href={wa()} />
              </dl>

              <a href={comoLlegar} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center border-2 border-amber-300 bg-amber-300 px-5 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.12em] text-zinc-950 transition hover:-translate-y-0.5 hover:border-white hover:bg-white active:scale-[.98]">
                Cómo llegar
              </a>
            </div>
            <div aria-hidden="true" className="damero h-4 border-t-2 border-amber-300/40" />
          </div>
        </div>
      </div>
    </section>
  )
}
