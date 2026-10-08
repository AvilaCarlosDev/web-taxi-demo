import { useLayoutEffect, useRef, useState } from 'react'

const quietud = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const movimientoActivo = () =>
  typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function' && !quietud()

const animacionDisponible = () => movimientoActivo() && typeof window.IntersectionObserver === 'function'

const limite = (valor) => Math.min(1, Math.max(0, valor))

export const quietudActiva = quietud

export const formatearCuenta = (valor, decimales = 0) =>
  decimales > 0 ? valor.toFixed(decimales) : String(Math.round(valor))

function alDesplazar(pintar) {
  let cuadro = 0
  const disparar = () => {
    if (cuadro) return
    cuadro = requestAnimationFrame(() => {
      cuadro = 0
      pintar()
    })
  }
  window.addEventListener('scroll', disparar, { passive: true })
  window.addEventListener('resize', disparar, { passive: true })
  pintar()
  return () => {
    window.removeEventListener('scroll', disparar)
    window.removeEventListener('resize', disparar)
    if (cuadro) cancelAnimationFrame(cuadro)
  }
}

function progresoDe(elemento) {
  const rect = elemento.getBoundingClientRect()
  const alto = window.innerHeight || 1
  return { rect, avance: limite((alto - rect.top) / (alto + rect.height)) }
}

export function useRevelados() {
  useLayoutEffect(() => {
    if (!animacionDisponible()) return undefined
    const nodos = Array.from(document.querySelectorAll('[data-reveal]'))
    if (nodos.length === 0) return undefined
    document.documentElement.classList.add('motion-on')
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return
          entrada.target.classList.add('revealed')
          observador.unobserve(entrada.target)
        })
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    )
    nodos.forEach((nodo) => observador.observe(nodo))
    return () => {
      observador.disconnect()
      document.documentElement.classList.remove('motion-on')
    }
  }, [])
}

export function useContador(valor, duracion = 900) {
  const [mostrado, setMostrado] = useState(() => (animacionDisponible() ? 0 : valor))
  const nodo = useRef(null)

  useLayoutEffect(() => {
    if (!animacionDisponible() || !nodo.current) return undefined
    let cuadro = 0
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((entrada) => entrada.isIntersecting)) return
        observador.disconnect()
        const inicio = performance.now()
        const paso = (ahora) => {
          const avance = limite((ahora - inicio) / duracion)
          setMostrado(valor * (1 - (1 - avance) ** 3))
          if (avance < 1) cuadro = requestAnimationFrame(paso)
        }
        cuadro = requestAnimationFrame(paso)
      },
      { threshold: 0, rootMargin: '0px 0px 10% 0px' },
    )
    observador.observe(nodo.current)
    return () => {
      observador.disconnect()
      if (cuadro) cancelAnimationFrame(cuadro)
    }
  }, [valor, duracion])

  return [nodo, mostrado]
}

export function useParallax(referencia) {
  useLayoutEffect(() => {
    const foto = referencia.current
    if (!foto || !movimientoActivo()) return undefined
    return alDesplazar(() => {
      const seccion = foto.parentElement
      if (!seccion) return
      const { rect, avance } = progresoDe(seccion)
      const desplazamiento = (avance - 0.5) * rect.height * 0.06
      foto.style.transform = `translate3d(0, ${desplazamiento.toFixed(1)}px, 0) scale(1.12)`
    })
  }, [referencia])
}

export function useBandaScroll(referencia) {
  useLayoutEffect(() => {
    const banda = referencia.current
    if (!banda || !movimientoActivo()) return undefined
    return alDesplazar(() => {
      const seccion = banda.closest('section') || banda.parentElement
      if (!seccion) return
      const { avance } = progresoDe(seccion)
      const x = (avance * 144).toFixed(1)
      banda.style.backgroundPosition = `${x}px 0px, ${Number(x) + 24}px 24px`
    })
  }, [referencia])
}

export function useRecorrido(referencia) {
  useLayoutEffect(() => {
    const tramo = referencia.current
    if (!tramo || !movimientoActivo()) return undefined
    tramo.style.setProperty('--progreso', '0')
    return alDesplazar(() => {
      const { avance } = progresoDe(tramo)
      tramo.style.setProperty('--progreso', avance.toFixed(3))
    })
  }, [referencia])
}
