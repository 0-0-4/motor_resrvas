(function () {
  'use strict';

  /* ─── Configuración ──────────────────────────────────────────────── */
  const API_BASE = 'https://vmi3024621.contaboserver.net/webhook';

  /* ─── Estilos ────────────────────────────────────────────────────── */
  const CSS = `
    .hr-widget * { box-sizing: border-box; margin: 0; padding: 0; }
    .hr-widget {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      max-width: 480px;
      margin: 0 auto;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 32px rgba(0,0,0,.10);
      overflow: hidden;
    }
    .hr-header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 28px 28px 20px;
      color: #fff;
    }
    .hr-header h2 {
      font-size: 1.3rem;
      font-weight: 600;
      letter-spacing: .3px;
    }
    .hr-header p {
      font-size: .82rem;
      opacity: .65;
      margin-top: 4px;
    }
    /* Pasos */
    .hr-steps {
      display: flex;
      gap: 6px;
      margin-top: 18px;
    }
    .hr-step-dot {
      flex: 1;
      height: 3px;
      border-radius: 2px;
      background: rgba(255,255,255,.2);
      transition: background .3s;
    }
    .hr-step-dot.active { background: #c9a96e; }
    /* Cuerpo */
    .hr-body { padding: 24px 28px 28px; }
    /* Etiquetas */
    .hr-label {
      display: block;
      font-size: .75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .6px;
      color: #888;
      margin-bottom: 6px;
    }
    /* Campo */
    .hr-field { margin-bottom: 18px; }
    .hr-input {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid #e2e2e2;
      border-radius: 8px;
      font-size: .95rem;
      color: #1a1a2e;
      background: #fafafa;
      transition: border-color .2s, background .2s;
      outline: none;
      appearance: none;
    }
    .hr-input:focus {
      border-color: #c9a96e;
      background: #fff;
    }
    /* Selector de servicio */
    .hr-service-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 18px;
    }
    .hr-service-card {
      border: 2px solid #e2e2e2;
      border-radius: 10px;
      padding: 16px 10px;
      text-align: center;
      cursor: pointer;
      transition: border-color .2s, background .2s, transform .15s;
      background: #fafafa;
    }
    .hr-service-card:hover { border-color: #c9a96e; background: #fff; transform: translateY(-1px); }
    .hr-service-card.selected { border-color: #c9a96e; background: #fffbf4; }
    .hr-service-card .icon { font-size: 1.8rem; margin-bottom: 6px; }
    .hr-service-card .name { font-size: .88rem; font-weight: 600; color: #1a1a2e; }
    /* Slots */
    .hr-slots-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 20px;
    }
    .hr-slot {
      border: 2px solid #e2e2e2;
      border-radius: 8px;
      padding: 10px 6px;
      text-align: center;
      cursor: pointer;
      transition: border-color .2s, background .2s;
      background: #fafafa;
    }
    .hr-slot:hover { border-color: #c9a96e; background: #fff; }
    .hr-slot.selected { border-color: #c9a96e; background: #fffbf4; }
    .hr-slot .hora { font-size: .95rem; font-weight: 700; color: #1a1a2e; }
    .hr-slot .plazas { font-size: .72rem; color: #888; margin-top: 2px; }
    .hr-slot.pocas .plazas { color: #e07b39; }
    /* Sin slots */
    .hr-empty {
      text-align: center;
      padding: 24px 0;
      color: #aaa;
      font-size: .9rem;
    }
    /* Botón principal */
    .hr-btn {
      width: 100%;
      padding: 13px;
      background: #1a1a2e;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: .97rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .2s, transform .15s, opacity .2s;
      letter-spacing: .2px;
    }
    .hr-btn:hover { background: #c9a96e; transform: translateY(-1px); }
    .hr-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; background: #1a1a2e; }
    /* Botón secundario */
    .hr-btn-back {
      background: none;
      border: none;
      color: #888;
      font-size: .85rem;
      cursor: pointer;
      margin-bottom: 18px;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .hr-btn-back:hover { color: #1a1a2e; }
    /* Error */
    .hr-error {
      background: #fff0f0;
      border: 1px solid #fca5a5;
      color: #b91c1c;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: .85rem;
      margin-bottom: 16px;
    }
    /* Loader */
    .hr-loading {
      text-align: center;
      padding: 20px 0;
      color: #aaa;
      font-size: .9rem;
    }
    .hr-spinner {
      display: inline-block;
      width: 22px; height: 22px;
      border: 3px solid #e2e2e2;
      border-top-color: #c9a96e;
      border-radius: 50%;
      animation: hr-spin .7s linear infinite;
      margin-bottom: 8px;
    }
    @keyframes hr-spin { to { transform: rotate(360deg); } }
    /* Confirmacion */
    .hr-success {
      text-align: center;
      padding: 10px 0 6px;
    }
    .hr-success-icon {
      width: 60px; height: 60px;
      background: #f0fdf4;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 1.6rem;
    }
    .hr-success h3 {
      font-size: 1.15rem;
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .hr-success p {
      font-size: .87rem;
      color: #666;
      line-height: 1.5;
    }
    .hr-resumen {
      background: #f8f8f8;
      border-radius: 10px;
      padding: 16px;
      margin: 18px 0;
      text-align: left;
    }
    .hr-resumen-row {
      display: flex;
      justify-content: space-between;
      font-size: .87rem;
      padding: 4px 0;
    }
    .hr-resumen-row span:first-child { color: #888; }
    .hr-resumen-row span:last-child { font-weight: 600; color: #1a1a2e; }
    .hr-nueva-reserva {
      margin-top: 16px;
      background: none;
      border: 1.5px solid #e2e2e2;
      color: #1a1a2e;
      border-radius: 8px;
      padding: 10px;
      font-size: .88rem;
      cursor: pointer;
      width: 100%;
      transition: border-color .2s;
    }
    .hr-nueva-reserva:hover { border-color: #c9a96e; }
  `;

  /* ─── Estado ─────────────────────────────────────────────────────── */
  let state = {
    step: 1,
    servicio: null,
    fecha: null,
    hora: null,
    plazas_libres: null,
    slots: [],
    loading: false,
    error: null,
    confirmacion: null,
  };

  let container = null;

  /* ─── API ────────────────────────────────────────────────────────── */
  async function fetchSlots(servicio, fecha) {
    const url = `${API_BASE}/disponibilidad?servicio=${encodeURIComponent(servicio)}&fecha=${encodeURIComponent(fecha)}`;
    console.log('[widget-reservas] GET', url);
    const res = await fetch(url);
    const data = await res.json();
    console.log('[widget-reservas] disponibilidad response:', data);
    if (!res.ok) throw new Error(data.error || `Error HTTP ${res.status}`);
    return data;
  }

  async function postReserva(payload) {
    const url = `${API_BASE}/reserva`;
    console.log('[widget-reservas] POST', url, payload);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let data = {};
    const text = await res.text();
    console.log('[widget-reservas] reserva response (HTTP ' + res.status + ') raw:', text);
    try {
      data = JSON.parse(text);
    } catch {
      // n8n devolvió algo no-JSON; si HTTP 200 lo tratamos como éxito
      if (res.ok) return { ok: true };
      throw new Error(`Error HTTP ${res.status}: ${text.slice(0, 120)}`);
    }
    console.log('[widget-reservas] reserva response parsed:', data);
    if (!res.ok || data.ok === false) throw new Error(data.error || `Error ${res.status} al crear la reserva`);
    return data;
  }

  /* ─── Helpers ────────────────────────────────────────────────────── */
  function formatFecha(fecha) {
    if (!fecha) return '';
    const [y, m, d] = fecha.split('-');
    return `${d}/${m}/${y}`;
  }

  function formatServicio(s) {
    return s === 'spa' ? 'Spa' : 'Restaurante';
  }

  function formatHora(h) {
    return h ? h.slice(0, 5) : '';
  }

  function minDate() {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  /* ─── Render ─────────────────────────────────────────────────────── */
  function render() {
    container.innerHTML = buildHTML();
    attachEvents();
  }

  function buildHTML() {
    const stepDots = [1, 2, 3, 4]
      .map(
        (n) =>
          `<div class="hr-step-dot ${state.step >= n ? 'active' : ''}"></div>`
      )
      .join('');

    const headerText = {
      1: { title: 'Haz tu reserva', sub: 'Selecciona el servicio y la fecha' },
      2: { title: 'Elige tu hora', sub: `${formatServicio(state.servicio)} · ${formatFecha(state.fecha)}` },
      3: { title: 'Tus datos', sub: `${formatServicio(state.servicio)} · ${formatFecha(state.fecha)} · ${formatHora(state.hora)}` },
      4: { title: 'Reserva confirmada', sub: 'Te esperamos' },
    }[state.step];

    return `
      <div class="hr-header">
        <h2>${headerText.title}</h2>
        <p>${headerText.sub}</p>
        <div class="hr-steps">${stepDots}</div>
      </div>
      <div class="hr-body">
        ${state.error ? `<div class="hr-error">${state.error}</div>` : ''}
        ${buildStep()}
      </div>
    `;
  }

  function buildStep() {
    switch (state.step) {
      case 1: return buildStep1();
      case 2: return buildStep2();
      case 3: return buildStep3();
      case 4: return buildStep4();
    }
  }

  function buildStep1() {
    return `
      <label class="hr-label">Servicio</label>
      <div class="hr-service-grid">
        <div class="hr-service-card ${state.servicio === 'spa' ? 'selected' : ''}" data-servicio="spa">
          <div class="icon">♨</div>
          <div class="name">Spa</div>
        </div>
        <div class="hr-service-card ${state.servicio === 'restaurante' ? 'selected' : ''}" data-servicio="restaurante">
          <div class="icon">🍽</div>
          <div class="name">Restaurante</div>
        </div>
      </div>
      <div class="hr-field">
        <label class="hr-label">Fecha</label>
        <input class="hr-input" type="date" id="hr-fecha" min="${minDate()}" value="${state.fecha || ''}">
      </div>
      <button class="hr-btn" id="hr-btn-step1" ${!state.servicio || !state.fecha ? 'disabled' : ''}>
        Ver disponibilidad →
      </button>
    `;
  }

  function buildStep2() {
    if (state.loading) {
      return `
        <div class="hr-loading">
          <div class="hr-spinner"></div><br>Consultando disponibilidad…
        </div>
      `;
    }
    if (!state.slots.length) {
      return `
        <button class="hr-btn-back" id="hr-btn-back2">← Cambiar fecha</button>
        <div class="hr-empty">No hay plazas disponibles para esta fecha.<br>Prueba con otro día.</div>
      `;
    }
    const cards = state.slots
      .map((s) => {
        const pocas = s.plazas_libres <= 2;
        return `
          <div class="hr-slot ${state.hora === s.hora ? 'selected' : ''} ${pocas ? 'pocas' : ''}"
               data-hora="${s.hora}" data-plazas="${s.plazas_libres}">
            <div class="hora">${formatHora(s.hora)}</div>
            <div class="plazas">${pocas ? '¡Solo ' + s.plazas_libres + ' plaza' + (s.plazas_libres === 1 ? '' : 's') + '!' : s.plazas_libres + ' plazas'}</div>
          </div>`;
      })
      .join('');
    return `
      <button class="hr-btn-back" id="hr-btn-back2">← Cambiar fecha</button>
      <label class="hr-label">Horarios disponibles</label>
      <div class="hr-slots-grid">${cards}</div>
      <button class="hr-btn" id="hr-btn-step2" ${!state.hora ? 'disabled' : ''}>
        Continuar →
      </button>
    `;
  }

  function buildStep3() {
    const maxPersonas = state.plazas_libres || 10;
    return `
      <button class="hr-btn-back" id="hr-btn-back3">← Cambiar hora</button>
      <div class="hr-field">
        <label class="hr-label">Nombre completo</label>
        <input class="hr-input" type="text" id="hr-nombre" placeholder="María García" value="${state.nombre || ''}">
      </div>
      <div class="hr-field">
        <label class="hr-label">Email</label>
        <input class="hr-input" type="email" id="hr-email" placeholder="maria@email.com" value="${state.email || ''}">
      </div>
      <div class="hr-field">
        <label class="hr-label">Número de personas</label>
        <select class="hr-input" id="hr-personas">
          ${Array.from({ length: maxPersonas }, (_, i) => i + 1)
            .map(
              (n) =>
                `<option value="${n}" ${state.personas == n ? 'selected' : ''}>${n} persona${n > 1 ? 's' : ''}</option>`
            )
            .join('')}
        </select>
      </div>
      <button class="hr-btn" id="hr-btn-step3" ${state.loading ? 'disabled' : ''}>
        ${state.loading ? 'Confirmando…' : 'Confirmar reserva'}
      </button>
    `;
  }

  function buildStep4() {
    const c = state.confirmacion;
    return `
      <div class="hr-success">
        <div class="hr-success-icon">✓</div>
        <h3>¡Reserva confirmada!</h3>
        <p>Te hemos enviado un email de confirmación a <strong>${state.email}</strong>.</p>
        <div class="hr-resumen">
          <div class="hr-resumen-row">
            <span>Servicio</span>
            <span>${formatServicio(state.servicio)}</span>
          </div>
          <div class="hr-resumen-row">
            <span>Fecha</span>
            <span>${formatFecha(state.fecha)}</span>
          </div>
          <div class="hr-resumen-row">
            <span>Hora</span>
            <span>${formatHora(state.hora)}</span>
          </div>
          <div class="hr-resumen-row">
            <span>Personas</span>
            <span>${state.personas}</span>
          </div>
          <div class="hr-resumen-row">
            <span>Nombre</span>
            <span>${state.nombre}</span>
          </div>
        </div>
        <button class="hr-nueva-reserva" id="hr-nueva-reserva">Hacer otra reserva</button>
      </div>
    `;
  }

  /* ─── Eventos ────────────────────────────────────────────────────── */
  function attachEvents() {
    // Step 1
    container.querySelectorAll('.hr-service-card').forEach((card) => {
      card.addEventListener('click', () => {
        state.servicio = card.dataset.servicio;
        state.error = null;
        updateStep1Btn();
        container.querySelectorAll('.hr-service-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    const fechaInput = container.querySelector('#hr-fecha');
    if (fechaInput) {
      fechaInput.addEventListener('change', () => {
        state.fecha = fechaInput.value;
        state.error = null;
        updateStep1Btn();
      });
    }

    const btnStep1 = container.querySelector('#hr-btn-step1');
    if (btnStep1) {
      btnStep1.addEventListener('click', goToStep2);
    }

    // Step 2
    const btnBack2 = container.querySelector('#hr-btn-back2');
    if (btnBack2) btnBack2.addEventListener('click', () => { state.step = 1; state.error = null; render(); });

    container.querySelectorAll('.hr-slot').forEach((slot) => {
      slot.addEventListener('click', () => {
        state.hora = slot.dataset.hora;
        state.plazas_libres = parseInt(slot.dataset.plazas, 10);
        state.error = null;
        container.querySelectorAll('.hr-slot').forEach((s) => s.classList.remove('selected'));
        slot.classList.add('selected');
        const btnStep2 = container.querySelector('#hr-btn-step2');
        if (btnStep2) btnStep2.disabled = false;
      });
    });

    const btnStep2 = container.querySelector('#hr-btn-step2');
    if (btnStep2) btnStep2.addEventListener('click', () => { state.step = 3; state.error = null; render(); });

    // Step 3
    const btnBack3 = container.querySelector('#hr-btn-back3');
    if (btnBack3) btnBack3.addEventListener('click', () => { state.step = 2; state.error = null; render(); });

    const btnStep3 = container.querySelector('#hr-btn-step3');
    if (btnStep3) btnStep3.addEventListener('click', submitReserva);

    // Step 4
    const btnNueva = container.querySelector('#hr-nueva-reserva');
    if (btnNueva) {
      btnNueva.addEventListener('click', () => {
        state = { step: 1, servicio: null, fecha: null, hora: null, plazas_libres: null, slots: [], loading: false, error: null, confirmacion: null };
        render();
      });
    }
  }

  function updateStep1Btn() {
    const btn = container.querySelector('#hr-btn-step1');
    if (btn) btn.disabled = !state.servicio || !state.fecha;
  }

  async function goToStep2() {
    state.step = 2;
    state.loading = true;
    state.hora = null;
    state.error = null;
    render();
    try {
      const res = await fetchSlots(state.servicio, state.fecha);
      state.slots = res.ok ? res.data : [];
      if (!res.ok) state.error = res.error || 'Error al consultar disponibilidad';
    } catch (e) {
      state.slots = [];
      state.error = e.message;
    }
    state.loading = false;
    render();
  }

  async function submitReserva() {
    const nombre = container.querySelector('#hr-nombre').value.trim();
    const email = container.querySelector('#hr-email').value.trim();
    const personas = parseInt(container.querySelector('#hr-personas').value, 10);

    if (!nombre) { state.error = 'El nombre es obligatorio'; render(); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      state.error = 'Introduce un email válido'; render(); return;
    }

    state.nombre = nombre;
    state.email = email;
    state.personas = personas;
    state.loading = true;
    state.error = null;
    render();

    try {
      const res = await postReserva({
        nombre,
        email,
        servicio: state.servicio,
        fecha: state.fecha,
        hora: state.hora,
        personas,
      });
      state.confirmacion = res;
      state.step = 4;
    } catch (e) {
      state.error = e.message;
    }
    state.loading = false;
    render();
  }

  /* ─── Init ───────────────────────────────────────────────────────── */
  function init() {
    // Inyectar CSS
    if (!document.querySelector('#hr-widget-styles')) {
      const style = document.createElement('style');
      style.id = 'hr-widget-styles';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    // Encontrar o crear contenedor
    container = document.querySelector('#hotel-reservas');
    if (!container) {
      container = document.createElement('div');
      container.id = 'hotel-reservas';
      // Si el script tiene data-container, buscar ese selector
      const scriptTag = document.currentScript || document.querySelector('script[src*="widget-reservas"]');
      const selector = scriptTag && scriptTag.dataset.container;
      const target = selector ? document.querySelector(selector) : null;
      (target || document.body).appendChild(container);
    }
    container.classList.add('hr-widget');

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
