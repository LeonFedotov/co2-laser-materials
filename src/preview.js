export function materialPreview(material, thicknessMm, instance = material.id, variant = '', view = 'isometric') {
  const t = Math.max(0.05, Math.min(40, Number(thicknessMm) || material.preview.defaultThicknessMm))
  const colors = material.preview.colors
  const kind = variant === 'Marble' ? 'marble' : material.preview.kind
  const id = 'specimen-' + instance.replace(/[^a-zA-Z0-9_-]/g, '')
  const face = colors.face
  const edge = colors.edge
  const light = colors.highlight
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
  const f = value => Number(value.toFixed(3))
  let seed = [...material.id].reduce((value, char) => value * 31 + char.charCodeAt(0) >>> 0, 7)
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296 }
  const path = (d, color, width, opacity = 1) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" opacity="${opacity}"/>`
  const rect = (x, y, w, h, color, opacity = 1) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${color}" opacity="${opacity}"/>`
  const ellipse = (cx, cy, rx, ry, color, opacity = 1) => `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${color}" opacity="${opacity}"/>`
  const transparent = ['clear', 'glass', 'laminated-glass'].includes(kind)
  const wood = ['wood', 'plywood', 'bamboo'].includes(kind)
  let top = rect(0, 0, 60, 40, `url(#${id}-face)`, transparent ? 0.68 : 1)
  let front = rect(0, 0, 60, t, edge, transparent ? 0.45 : 1)
  let side = rect(0, 0, 40, t, edge, transparent ? 0.56 : 1)

  if (wood) {
    for (let i = 0; i < 70; i++) {
      const y = i * 0.65 - 3
      const bend = Math.sin(i * 0.24) * 3.5
      const d = `M-4 ${f(y)} C12 ${f(y + bend)} 19 ${f(y - bend * 0.8)} 31 ${f(y + bend * 0.3)} S49 ${f(y + bend)} 64 ${f(y - 0.5)}`
      top += path(d, i % 3 ? edge : light, i % 9 ? 0.10 : 0.26, 0.14 + random() * 0.18)
    }
    if (kind === 'wood' && !['balsa', 'basswood'].includes(material.id)) {
      for (let i = 0; i < 10; i++) {
        const r = 0.9 + i * 0.55
        top += `<ellipse cx="${material.id === 'pine' ? 22 : 39}" cy="23" rx="${f(r * 2.15)}" ry="${f(r * 0.32)}" fill="none" stroke="${edge}" stroke-width="0.12" opacity="${f(0.26 - i * 0.012)}"/>`
      }
    }
    if (kind === 'plywood') {
      const count = Math.max(1, Math.round(t / 0.85))
      for (let layer = 0; layer < count; layer++) {
        const z = layer * t / count
        const h = t / count
        front += rect(0, z, 60, h * 0.93, layer % 2 ? face : light, layer % 2 ? 0.58 : 0.78)
        side += rect(0, z, 40, h * 0.93, layer % 2 ? light : face, layer % 2 ? 0.60 : 0.65)
        front += path(`M0 ${f(z + h * 0.9)} H60`, edge, 0.06, 0.5)
        side += path(`M0 ${f(z + h * 0.9)} H40`, edge, 0.06, 0.5)
      }
    } else {
      for (let i = 0; i < 16; i++) {
        const z = (i + 0.5) * t / 16
        front += path(`M0 ${f(z)} Q25 ${f(z + t * 0.05)} 60 ${f(z)}`, face, Math.max(0.02, t / 160), 0.45)
        side += `<ellipse cx="19" cy="${f(-t * 0.5)}" rx="${f(2.5 + i * 1.65)}" ry="${f(t * (0.4 + i * 0.1))}" fill="none" stroke="${light}" stroke-width="0.07" opacity="0.22"/>`
      }
    }
    if (kind === 'bamboo') {
      for (let y = 4; y < 40; y += 6) {
        top += path(`M0 ${y} H60`, edge, 0.18, 0.42)
        side += path(`M${y} 0 V${t}`, light, 0.2, 0.4)
      }
    }
  } else if (['fiber', 'paper', 'felt', 'leather', 'rubber', 'foam', 'cork', 'granite', 'slate', 'ceramic'].includes(kind)) {
    const count = kind === 'granite' || kind === 'cork' ? 220 : kind === 'felt' ? 220 : 145
    for (let i = 0; i < count; i++) {
      const x = random() * 60
      const y = random() * 40
      const color = i % 3 ? edge : light
      if (kind === 'granite' || kind === 'cork') {
        const r = 0.25 + random() * (kind === 'cork' ? 1.4 : 0.95)
        top += `<path d="M${f(x)} ${f(y - r)} l${f(r)} ${f(r * 0.7)} l${f(-r * 0.4)} ${f(r)} l${f(-r * 1.2)} ${f(-r * 0.4)} Z" fill="${color}" opacity="${f(0.25 + random() * 0.5)}"/>`
        const sx = x * 2 / 3
        side += ellipse(sx, y / 40 * t, r * 0.8, r * 0.7, color, 0.35)
        front += ellipse(x, y / 40 * t, r, r * 0.5, color, 0.3)
      } else if (['foam', 'leather', 'rubber'].includes(kind)) {
        const r = kind === 'foam' ? 0.1 + random() * 0.35 : 0.08 + random() * 0.12
        top += ellipse(x, y, r, r * 0.8, color, 0.18 + random() * 0.22)
        side += ellipse(x * 2 / 3, y / 40 * t, r * 0.7, r * 0.65, light, 0.25)
        front += ellipse(x, y / 40 * t, r, r * 0.85, light, 0.16)
      } else {
        const dx = kind === 'felt' ? (random() - 0.5) * 2 : random() * 0.8 + 0.1
        top += path(`M${f(x)} ${f(y)} l${f(dx)} ${f((random() - 0.5) * 0.8)}`, color, kind === 'felt' ? 0.12 : 0.08, 0.32)
        front += path(`M${f(x)} ${f(y / 40 * t)} l0.4 0.05`, light, 0.08, 0.28)
        side += path(`M${f(x * 2 / 3)} ${f(y / 40 * t)} l0.4 0.05`, light, 0.08, 0.25)
      }
    }
    if (kind === 'slate') {
      for (let i = 0; i < 17; i++) {
        const y = i * 2.7
        top += path(`M-2 ${y} l12 -1.4 l8 0.8 l15 -1.8 l10 0.9 l19 -1.5`, i % 2 ? light : edge, 0.18, 0.25)
      }
      for (let z = 0.5; z < t; z += 0.9) {
        front += path(`M0 ${f(z)} l18 0.2 l13 -0.3 l29 0.1`, light, 0.1, 0.32)
        side += path(`M0 ${f(z)} l21 0.3 l19 -0.2`, light, 0.09, 0.3)
      }
    }
    if (kind === 'ceramic') {
      front += rect(0, 0, 60, Math.min(0.45, t / 4), light, 0.9)
      side += rect(0, 0, 40, Math.min(0.45, t / 4), face, 0.8)
    }
  } else if (['weave', 'denim', 'carbon', 'composite'].includes(kind)) {
    const step = kind === 'carbon' ? 2.4 : kind === 'composite' ? 1.3 : 0.62
    for (let y = 0; y < 40; y += step) top += path(`M0 ${f(y)} H60`, light, step * 0.36, kind === 'composite' ? 0.14 : 0.28)
    for (let x = 0; x < 60; x += step) top += path(`M${f(x)} 0 V40`, edge, step * 0.34, 0.4)
    if (kind === 'denim' || kind === 'carbon') {
      for (let x = -45; x < 62; x += kind === 'carbon' ? 3.5 : 1.3) top += path(`M${f(x)} 0 l40 40`, light, kind === 'carbon' ? 1.3 : 0.18, 0.3)
    }
    for (let z = 0.15; z < t; z += kind === 'composite' ? 0.3 : 0.18) {
      front += path(`M0 ${f(z)} H60`, face, 0.05, 0.65)
      side += path(`M0 ${f(z)} H40`, light, 0.05, 0.3)
    }
  } else if (kind === 'corrugated') {
    top += rect(0, 0, 60, 40, face, 0.6)
    for (let i = 0; i < 75; i++) top += path(`M${f(random() * 60)} ${f(random() * 40)} l1 0.15`, light, 0.05, 0.45)
    const liner = Math.min(0.25, t / 5)
    front = rect(0, 0, 60, t, edge, 0.95)
    front += rect(0, 0, 60, liner, light) + rect(0, t - liner, 60, liner, face)
    let flute = `M0 ${f(t / 2)}`
    const width = Math.max(t * 1.1, 1)
    for (let x = 0; x < 62; x += width) flute += ` q${f(width / 4)} ${f(-t + liner * 2)} ${f(width / 2)} 0 t${f(width / 2)} 0`
    front += path(flute, light, 0.19, 0.9)
    side += rect(0, 0, 40, liner, light, 0.8) + rect(0, t - liner, 40, liner, face, 0.8)
    side += path(`M0 ${f(t / 2)} H40`, light, 0.2, 0.55)
  } else if (kind === 'marble') {
    top = rect(0, 0, 60, 40, '#4a4c48')
    for (let i = 0; i < 11; i++) {
      const x = i * 7 - 15
      const d = `M${x} -3 l7 9 l-3 6 l14 8 l-1 9 l9 14`
      top += path(d, '#ddd6c4', i % 3 ? 0.2 : 0.65, 0.65)
      top += path(d, '#b4afa0', 1.1, 0.13)
    }
    for (let x = 6; x < 60; x += 13) front += path(`M${x} 0 l${f(t * 0.5)} ${t}`, '#dad5c7', 0.18, 0.65)
  } else if (kind === 'metal' || kind === 'mirror' || kind === 'coated') {
    if (kind !== 'coated') {
      for (let i = 0; i < 110; i++) {
        const y = i * 0.39
        top += path(`M0 ${f(y)} H60`, i % 2 ? light : edge, 0.025 + random() * 0.04, kind === 'mirror' ? 0.05 : 0.23)
      }
    }
    front += rect(0, 0, 60, t, `url(#${id}-metal)`, 0.9)
    side += rect(0, 0, 40, t, `url(#${id}-metal)`, 0.7)
    if (kind === 'coated' || material.id === 'anodized') {
      front += rect(0, 0, 60, Math.min(0.16, t / 4), face)
      side += rect(0, 0, 40, Math.min(0.16, t / 4), face)
    }
    if (kind === 'mirror') top += `<path d="M5 40 L42 0 H60 L22 40 Z" fill="${light}" opacity="0.38"/>`
  } else if (kind === 'laminate') {
    front += rect(0, 0, 60, Math.min(0.18, t / 4), face)
    side += rect(0, 0, 40, Math.min(0.18, t / 4), face)
  }

  if (transparent) {
    const z = t * 3
    top += `<path d="M7 40 L42 0 H49 L14 40 Z" fill="${light}" opacity="0.45"/>`
    top += `<path d="M17 40 L52 0 H54 L19 40 Z" fill="${light}" opacity="0.55"/>`
    front += rect(0, 0, 60, t, `url(#${id}-clear)`, 0.7)
    side += rect(0, 0, 40, t, `url(#${id}-clear)`, 0.75)
    front += path(`M0 ${f(t)} H60`, light, 0.12, 0.8)
    side += path(`M0 ${f(t)} H40`, light, 0.12, 0.8)
    if (kind === 'laminated-glass') {
      front += rect(0, t * 0.48, 60, t * 0.04, '#8ba29b', 0.7)
      side += rect(0, t * 0.48, 40, t * 0.04, '#8ba29b', 0.7)
    }
  }
  const depth = f(t * 3)
  const offset = f(Math.max(0, (285 - 165 - depth) / 2))
  const outline = transparent ? light : face
  const defs = `<defs>
      <linearGradient id="${id}-face" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light}"/><stop offset="0.3" stop-color="${face}"/><stop offset="1" stop-color="${face}"/></linearGradient>
      <linearGradient id="${id}-metal" x1="0" y1="0" x2="0.2" y2="1"><stop stop-color="${light}"/><stop offset="0.45" stop-color="${edge}"/><stop offset="1" stop-color="${face}"/></linearGradient>
      <linearGradient id="${id}-clear" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${light}" stop-opacity="0.2"/><stop offset="1" stop-color="${edge}"/></linearGradient>
      <clipPath id="${id}-top"><rect width="60" height="40"/></clipPath>
      <clipPath id="${id}-front"><rect width="60" height="${t}"/></clipPath>
      <clipPath id="${id}-side"><rect width="40" height="${t}"/></clipPath>
      <filter id="${id}-shadow" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>`
  if (view === 'edge-profile') {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="material-profile" viewBox="0 0 190 ${f(depth + 8)}" role="img" aria-label="${esc(material.name)} edge profile: 60 millimeters across, ${t} millimeters thick. Unexaggerated depth, representative internal structure.">
      ${defs}<g transform="translate(5 4) scale(3)" clip-path="url(#${id}-front)">${front}</g>
    </svg>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" class="material-specimen" viewBox="15 ${f(offset + 3)} 315 ${f(190 + depth)}" role="img" aria-label="${esc(material.name)}: 60 by 40 millimeter face, ${t} millimeter stock thickness. Representative grain and cut edge.">
    ${defs}
    <g transform="translate(0 ${offset})">
      <ellipse cx="176" cy="${f(155 + depth)}" rx="127" ry="20" fill="#222923" opacity="0.13" filter="url(#${id}-shadow)"/>
      ${transparent ? `<path d="M145 ${15 + depth} L300.885 ${105 + depth} L196.962 ${165 + depth} L41.077 ${75 + depth} Z" fill="${face}" opacity="0.14" stroke="${edge}" stroke-width="0.6"/>` : ''}
      <g transform="matrix(2.598076 1.5 0 3 41.07696 75)" clip-path="url(#${id}-front)">${front}</g>
      <g transform="matrix(-2.598076 1.5 0 3 300.88456 105)" clip-path="url(#${id}-side)">${side}${rect(0, 0, 40, t, '#0c1c1a', 0.11)}</g>
      <g transform="matrix(2.598076 1.5 -2.598076 1.5 145 15)" clip-path="url(#${id}-top)">${top}</g>
      <path d="M41.077 75 L196.962 165 L300.885 105" fill="none" stroke="${outline}" stroke-width="0.65" opacity="0.68"/>
    </g>
  </svg>`
}
