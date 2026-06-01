import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, XCircle, Copy, FileText, Info, AlertCircle, Save, Download, Trash2, FolderOpen, Printer } from 'lucide-react';

const EVALUADORES = ['María José', 'Daniela', 'Magali', 'Daniel', 'José', 'Otro'];

const PROYECTOS = [
  { nombre: 'Generación de bobinas de papel con partículas de cobre (MCu)', facultad: 'Diseño', pi: 'Alejandra Amenabar, Paulina Contreras, Nataly Silva' },
  { nombre: 'Bioaglomerado (Eucalyptus globulus Labill)', facultad: 'Diseño', pi: 'Trinidad Lazcano, Nataly Silva' },
  { nombre: 'Sistema para evaluar la homogeneidad de recubrimiento conductores en superficies translucidas', facultad: 'Diseño', pi: 'Nataly Silva' },
  { nombre: 'Incorporación de Inteligencia Artificial en Procesos de Proyectos de Obras Industriales (FIE Salfamontaje)', facultad: 'Ingeniería', pi: 'Ximena Ferrada' },
  { nombre: 'Paquete tecnológico de simulación médica (Simulador de cirugías de mínimo acceso, Simulador de procedimientos laparoscópicos)', facultad: 'Ingeniería', pi: 'Jose Ignacio Guzmán, Camilo Rodriguez' },
  { nombre: 'Paquete de proyectos de Minería del Futuro (3 proyectos 2025 y 6 proyectos 2026)', facultad: 'Ingeniería', pi: 'Camilo Rodriguez' },
  { nombre: 'Vastago UDD-CAS', facultad: 'CAS-Ingeniería', pi: 'Camilo Rodriguez' },
  { nombre: 'Hemocount UDD-CAS', facultad: 'Ingeniería', pi: 'José Gomez-Marquez, Camilo Rodriguez' },
  { nombre: 'Plataforma Farmacopedia UDD-CAS', facultad: 'Ingeniería', pi: 'Camilo Rodriguez' },
  { nombre: 'Membranas de celulosa bacteriana para el tratamiento de quemaduras', facultad: 'Ingeniería', pi: 'Bruno Grossi' },
  { nombre: 'Sistema para la administración controlada de medicamentos endovenosos', facultad: 'Ingeniería', pi: 'Jorge Contreras' },
  { nombre: 'Proyecto FALP metodología para el tratamiento de ansiedad y depresión', facultad: 'Psicología', pi: 'Jaime Silva' },
  { nombre: 'Covitalidad', facultad: 'Psicología', pi: 'Ana María Espinoza, Jorge Varela' },
  { nombre: 'Matriz de análisis urbano y vial (TOD)', facultad: 'Arquitectura, Gobierno, Ingeniería', pi: 'Julio Nazar, Rodrigo Troncoso, Loreto Bravo' },
  { nombre: 'SOFOFA', facultad: 'CILED', pi: 'Soledad Ortuzar' }
];

const CRITERIOS = [
  {
    id: 'alineacion',
    nombre: 'Alineación estratégica',
    peso: 15,
    definicion: 'Evalúa el grado de alineación de la iniciativa con los focos institucionales, temáticas prioritarias, industrias o sectores estratégicos y contrapartes relevantes para la UDD.',
    checklist: [
      'Alineado con focos institucionales de investigación',
      'Vinculado a industria, sector estratégico, territorio o desafío prioritario',
      'Relación con contraparte estratégica actual o potencial',
      'Contribuye a posicionamiento institucional',
      'Contribuye a objetivos institucionales de impacto, transferencia o vinculación con el entorno'
    ]
  },
  {
    id: 'impacto',
    nombre: 'Potencial de impacto',
    peso: 15,
    definicion: 'Evalúa la magnitud, relevancia y plausibilidad del impacto esperado, considerando diversas vías de transferencia y uso del conocimiento.',
    checklist: [
      'Problema relevante claramente definido',
      'Impacto plausible y no solo aspiracional',
      'Beneficiarios, usuarios o adoptantes identificados',
      'Considera una vía de transferencia, adopción, implementación, masificación o disponibilización',
      'Impacto potencialmente medible mediante indicadores de proceso, resultado o impacto'
    ],
    ayuda: {
      titulo: 'Vías de impacto posibles',
      items: [
        'Productos o servicios comercializados',
        'Productos, metodologías o contenidos puestos a disposición',
        'EBCTs / licenciamiento',
        'Uso o adopción de soluciones',
        'Incidencia en política pública',
        'Masificación o implementación institucional',
        'Generación de bienes públicos',
        'Disponibilización de conocimiento aplicado'
      ]
    }
  },
  {
    id: 'madurez',
    nombre: 'Madurez de la solución',
    peso: 10,
    definicion: 'Evalúa el nivel de desarrollo de la solución, incluyendo evidencia técnica, metodológica y validación. Esta dimensión va más allá del TRL.',
    checklist: [
      'Nivel de desarrollo claro',
      'Comprensión de siguientes pasos técnicos o roadmap tecnológico/metodológico',
      'Evidencia técnica o metodológica disponible',
      'Validación inicial disponible, si aplica',
      'Riesgos técnicos o incertidumbres críticas identificadas'
    ]
  },
  {
    id: 'vinculacion',
    nombre: 'Vinculación e involucramiento del entorno',
    peso: 15,
    definicion: 'Evalúa el grado de interacción efectiva con actores externos relevantes.',
    checklist: [
      'Actores clave identificados',
      'Interés explícito del entorno, no solo potencial',
      'Participación del entorno en validación, diseño, desarrollo, pilotaje, escalamiento, boards o comités técnicos',
      'Compromisos formales o verificables: tiempo, datos, acceso, financiamiento, instalaciones, insumos clave u otros',
      'Probabilidad de adopción futura'
    ],
    nota: 'Una iniciativa puede obtener puntaje máximo sin aporte monetario, siempre que exista alto grado de involucramiento, compromiso técnico relevante, acceso a usuarios/datos/infraestructura o alto potencial de adopción verificable.'
  },
  {
    id: 'viabilidad',
    nombre: 'Viabilidad de transferencia, adopción o masificación',
    peso: 20,
    definicion: 'Evalúa la claridad y plausibilidad de la ruta para que la solución sea transferida, comercializada, adoptada, utilizada, implementada, masificada o disponibilizada. Incluye comprensión y diferenciación de la competencia.',
    checklist: [
      'Comprensión y diferenciación de la competencia o alternativas existentes',
      'Existe demanda, colaboración o interés concreto',
      'Ruta de transferencia, adopción, uso o masificación clara',
      'Usuarios, adoptantes, compradores, implementadores o beneficiarios identificados',
      'Barreras de implementación reconocidas'
    ],
    ayuda: {
      titulo: 'Rutas posibles',
      items: ['Comerciales', 'Institucionales', 'Públicas', 'Comunitarias', 'Abiertas']
    }
  },
  {
    id: 'factibilidad',
    nombre: 'Factibilidad de ejecución',
    peso: 15,
    definicion: 'Evalúa la viabilidad real de ejecutar la iniciativa y avanzar hacia transferencia e impacto, considerando recursos actuales y potenciales, capacidades disponibles y riesgos operativos.',
    checklist: [
      'Recursos disponibles o alcanzables',
      'Capacidades técnicas e infraestructura adecuadas, propias o de terceros accesibles',
      'Acceso a infraestructura, datos, usuarios o entornos necesarios',
      'Riesgos técnicos, operativos, relacionales, de financiamiento o de acceso a redes críticas identificados',
      'Plan de ejecución plausible'
    ],
    nota: 'Esta dimensión no incluye riesgos legales, regulatorios, éticos, de propiedad intelectual o restricciones contractuales — esos se evalúan en condiciones habilitantes.'
  },
  {
    id: 'equipo',
    nombre: 'Equipo',
    peso: 10,
    definicion: 'Evalúa la capacidad, compromiso y adaptabilidad del equipo.',
    checklist: [
      'Compromiso del Investigador/a Principal y personas clave del equipo',
      'Tiempo disponible de personas clave para tareas técnicas y para apoyar a la DTC en diseño y despliegue de validaciones y hoja de ruta',
      'Capacidades del equipo actual y potencial de incorporar otros miembros',
      'Apertura al feedback de la DTC y del entorno relevante',
      'Capacidad de aprendizaje, adaptación y eventual disposición a modificar la investigación según necesidades del entorno'
    ]
  }
];

const DIMENSIONES_GATING = [
  { id: 'legal', nombre: 'Legal / regulatorio' },
  { id: 'pi', nombre: 'Propiedad intelectual' },
  { id: 'contractual', nombre: 'Restricciones contractuales' },
  { id: 'etica', nombre: 'Ética / compliance institucional' }
];

const NIVELES_RIESGO = [
  { value: 'bajo', label: 'Riesgo bajo o mitigado', color: 'green' },
  { value: 'abordable', label: 'Riesgo identificado y abordable', color: 'amber' },
  { value: 'critico', label: 'Riesgo crítico no abordado', color: 'red' }
];

function calcularNotaSugerida(checksCumplidos, totalChecks, tieneEvidencia) {
  if (checksCumplidos === 0) return 1;
  if (checksCumplidos === 1) return 2;
  if (checksCumplidos === 2) return 3;
  if (checksCumplidos === totalChecks) {
    return tieneEvidencia ? 5 : 4;
  }
  return 4;
}

function getDecisionPorPuntaje(puntaje) {
  if (puntaje >= 80) return { nivel: 'prioritario', texto: 'Ingreso prioritario + opción de recursos', color: 'emerald' };
  if (puntaje >= 65) return { nivel: 'condicionado', texto: 'Ingreso condicionado', color: 'amber' };
  if (puntaje >= 50) return { nivel: 'reformulacion', texto: 'Reformulación requerida', color: 'orange' };
  return { nivel: 'no_ingreso', texto: 'No ingreso', color: 'red' };
}

export default function PortafolioIDi() {
  const [seccionesAbiertas, setSeccionesAbiertas] = useState({
    info: true,
    principios: true,
    criterios: true,
    gating: true,
    comite: true,
    recursos: true,
    resumen: true
  });

  const [criteriosAbiertos, setCriteriosAbiertos] = useState(
    Object.fromEntries(CRITERIOS.map(c => [c.id, true]))
  );

  const [infoGeneral, setInfoGeneral] = useState({
    nombre: '',
    unidad: '',
    pi: '',
    fecha: '',
    evaluadores: [],
    evaluadorOtro: '',
    estado: ''
  });

  const [evaluaciones, setEvaluaciones] = useState(
    Object.fromEntries(CRITERIOS.map(c => [c.id, {
      checks: c.checklist.map(() => false),
      notaFinal: null,
      evidencia: '',
      justificacion: ''
    }]))
  );

  const [gating, setGating] = useState(
    Object.fromEntries(DIMENSIONES_GATING.map(d => [d.id, { nivel: 'bajo', obs: '' }]))
  );

  const [decisionComite, setDecisionComite] = useState('');
  const [obsComite, setObsComite] = useState('');
  const [condiciones, setCondiciones] = useState({
    pi: false, validacion: false, propVal: false, modAdop: false,
    equipo: false, legal: false, etica: false, otros: false, otrosTexto: ''
  });
  const [recursos, setRecursos] = useState('');
  const [tipoApoyo, setTipoApoyo] = useState({
    financiamiento: false, vinculacion: false, validacion: false, roadmap: false,
    pi: false, transferencia: false, externo: false, otros: false, otrosTexto: ''
  });

  const [copiado, setCopiado] = useState(false);
  const [evaluacionesGuardadas, setEvaluacionesGuardadas] = useState([]);
  const [mostrarGuardadas, setMostrarGuardadas] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  // Cargar evaluaciones guardadas y borrador al iniciar
  useEffect(() => {
    try {
      const guardadas = localStorage.getItem('udd_evaluaciones_guardadas');
      if (guardadas) setEvaluacionesGuardadas(JSON.parse(guardadas));

      const borrador = localStorage.getItem('udd_borrador_actual');
      if (borrador) {
        const data = JSON.parse(borrador);
        if (data.infoGeneral) setInfoGeneral(data.infoGeneral);
        if (data.evaluaciones) setEvaluaciones(data.evaluaciones);
        if (data.gating) setGating(data.gating);
        if (data.decisionComite) setDecisionComite(data.decisionComite);
        if (data.obsComite) setObsComite(data.obsComite);
        if (data.condiciones) setCondiciones(data.condiciones);
        if (data.recursos) setRecursos(data.recursos);
        if (data.tipoApoyo) setTipoApoyo(data.tipoApoyo);
      }
    } catch (e) {
      console.error('Error cargando datos', e);
    }
  }, []);

  // Autoguardado del borrador actual
  useEffect(() => {
    try {
      const data = { infoGeneral, evaluaciones, gating, decisionComite, obsComite, condiciones, recursos, tipoApoyo };
      localStorage.setItem('udd_borrador_actual', JSON.stringify(data));
    } catch (e) {
      console.error('Error autoguardando', e);
    }
  }, [infoGeneral, evaluaciones, gating, decisionComite, obsComite, condiciones, recursos, tipoApoyo]);

  // Cálculos
  const calculosPorCriterio = useMemo(() => {
    return CRITERIOS.map(c => {
      const ev = evaluaciones[c.id];
      const checksCumplidos = ev.checks.filter(Boolean).length;
      const tieneEvidencia = ev.evidencia.trim().length > 0;
      const notaSugerida = calcularNotaSugerida(checksCumplidos, c.checklist.length, tieneEvidencia);
      const notaFinal = ev.notaFinal !== null ? ev.notaFinal : notaSugerida;
      const puntajePonderado = (notaFinal / 5) * c.peso;
      const requiereJustificacion = ev.notaFinal !== null && ev.notaFinal !== notaSugerida;
      return {
        ...c,
        checksCumplidos,
        totalChecks: c.checklist.length,
        notaSugerida,
        notaFinal,
        puntajePonderado,
        tieneEvidencia,
        requiereJustificacion,
        justificacionFaltante: requiereJustificacion && !ev.justificacion.trim()
      };
    });
  }, [evaluaciones]);

  const puntajeTotal = useMemo(() =>
    calculosPorCriterio.reduce((acc, c) => acc + c.puntajePonderado, 0)
  , [calculosPorCriterio]);

  const decisionPuntaje = getDecisionPorPuntaje(puntajeTotal);

  const analisisGating = useMemo(() => {
    const niveles = Object.values(gating).map(g => g.nivel);
    const tieneCritico = niveles.includes('critico');
    const tieneAbordable = niveles.includes('abordable');
    return { tieneCritico, tieneAbordable };
  }, [gating]);

  const decisionAjustada = useMemo(() => {
    if (analisisGating.tieneCritico) {
      if (decisionPuntaje.nivel === 'prioritario' || decisionPuntaje.nivel === 'condicionado') {
        return { texto: 'Ingreso condicionado por riesgo crítico', color: 'red', alerta: true };
      }
      return { texto: 'No ingreso por riesgo crítico', color: 'red', alerta: true };
    }
    if (analisisGating.tieneAbordable && decisionPuntaje.nivel === 'prioritario') {
      return { texto: 'Ingreso prioritario con alerta de condicionamiento', color: 'amber', alerta: true };
    }
    return { texto: decisionPuntaje.texto, color: decisionPuntaje.color, alerta: false };
  }, [analisisGating, decisionPuntaje]);

  const toggleSeccion = (id) => setSeccionesAbiertas(s => ({ ...s, [id]: !s[id] }));
  const toggleCriterio = (id) => setCriteriosAbiertos(s => ({ ...s, [id]: !s[id] }));

  const updateCheck = (critId, idx, value) => {
    setEvaluaciones(e => ({
      ...e,
      [critId]: {
        ...e[critId],
        checks: e[critId].checks.map((c, i) => i === idx ? value : c)
      }
    }));
  };

  const updateEvaluacion = (critId, field, value) => {
    setEvaluaciones(e => ({
      ...e,
      [critId]: { ...e[critId], [field]: value }
    }));
  };

  const generarResumen = () => {
    const fortalezas = calculosPorCriterio.filter(c => c.notaFinal >= 4).map(c => `• ${c.nombre} (nota ${c.notaFinal})`).join('\n') || '• Sin fortalezas destacadas';
    const brechas = calculosPorCriterio.filter(c => c.notaFinal <= 2).map(c => `• ${c.nombre} (nota ${c.notaFinal})`).join('\n') || '• Sin brechas críticas';
    const riesgosGating = DIMENSIONES_GATING
      .filter(d => gating[d.id].nivel !== 'bajo')
      .map(d => `• ${d.nombre}: ${NIVELES_RIESGO.find(n => n.value === gating[d.id].nivel)?.label}${gating[d.id].obs ? ` — ${gating[d.id].obs}` : ''}`)
      .join('\n') || '• Sin riesgos habilitantes identificados';

    const condicionesActivas = [];
    if (condiciones.pi) condicionesActivas.push('Resolver aspectos de PI');
    if (condiciones.validacion) condicionesActivas.push('Validación con actor(es) externo(s)');
    if (condiciones.propVal) condicionesActivas.push('Ajuste de propuesta de valor');
    if (condiciones.modAdop) condicionesActivas.push('Clarificar modelo de adopción');
    if (condiciones.equipo) condicionesActivas.push('Fortalecer equipo');
    if (condiciones.legal) condicionesActivas.push('Resolver aspectos legales/regulatorios');
    if (condiciones.etica) condicionesActivas.push('Resolver aspectos éticos/compliance');
    if (condiciones.otros && condiciones.otrosTexto) condicionesActivas.push(condiciones.otrosTexto);

    const apoyos = [];
    if (tipoApoyo.financiamiento) apoyos.push('Financiamiento');
    if (tipoApoyo.vinculacion) apoyos.push('Vinculación con actores');
    if (tipoApoyo.validacion) apoyos.push('Apoyo en validación');
    if (tipoApoyo.roadmap) apoyos.push('Apoyo en roadmap');
    if (tipoApoyo.pi) apoyos.push('Apoyo en PI');
    if (tipoApoyo.transferencia) apoyos.push('Apoyo en modelo de transferencia/adopción');
    if (tipoApoyo.externo) apoyos.push('Apoyo en búsqueda de financiamiento externo o no tradicional');
    if (tipoApoyo.otros && tipoApoyo.otrosTexto) apoyos.push(tipoApoyo.otrosTexto);

    const evaluadoresTexto = infoGeneral.evaluadores.length > 0
      ? infoGeneral.evaluadores.map(e => e === 'Otro' && infoGeneral.evaluadorOtro ? infoGeneral.evaluadorOtro : e).join(', ')
      : '[No especificados]';

    return `RESUMEN EJECUTIVO — PORTAFOLIO I+D+i UDD
═══════════════════════════════════════════════

Proyecto: ${infoGeneral.nombre || '[Sin nombre]'}
Unidad / Facultad: ${infoGeneral.unidad || '[No especificada]'}
Investigador/a Principal: ${infoGeneral.pi || '[No especificado]'}
Estado: ${infoGeneral.estado || '[No especificado]'}
Fecha: ${infoGeneral.fecha || '[No especificada]'}
Evaluador(es): ${evaluadoresTexto}

───────────────────────────────────────────────
RESULTADO CUANTITATIVO

Puntaje total: ${puntajeTotal.toFixed(1)} / 100
Decisión según puntaje: ${decisionPuntaje.texto}
Decisión ajustada por gating: ${decisionAjustada.texto}
${decisionComite ? `Decisión del comité: ${decisionComite}` : ''}

───────────────────────────────────────────────
PRINCIPALES FORTALEZAS (notas ≥ 4)

${fortalezas}

───────────────────────────────────────────────
PRINCIPALES BRECHAS (notas ≤ 2)

${brechas}

───────────────────────────────────────────────
RIESGOS HABILITANTES IDENTIFICADOS

${riesgosGating}

───────────────────────────────────────────────
CONDICIONES RECOMENDADAS

${condicionesActivas.length ? condicionesActivas.map(c => `• ${c}`).join('\n') : '• Sin condiciones específicas'}

───────────────────────────────────────────────
RECOMENDACIÓN DE RECURSOS

¿Se recomienda asignar recursos?: ${recursos || '[Sin definir]'}

Tipo de apoyo sugerido:
${apoyos.length ? apoyos.map(a => `• ${a}`).join('\n') : '• Sin apoyos específicos definidos'}

───────────────────────────────────────────────
OBSERVACIONES FINALES DEL COMITÉ

${obsComite || '[Sin observaciones registradas]'}
`;
  };

  const copiarResumen = async () => {
    try {
      await navigator.clipboard.writeText(generarResumen());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch (e) {
      console.error('Error al copiar', e);
    }
  };

  const guardarEvaluacion = () => {
    if (!infoGeneral.nombre) {
      setMensajeGuardado('⚠️ Selecciona un proyecto antes de guardar');
      setTimeout(() => setMensajeGuardado(''), 3000);
      return;
    }
    const nueva = {
      id: Date.now(),
      fechaGuardado: new Date().toLocaleString('es-CL'),
      proyecto: infoGeneral.nombre,
      puntajeTotal: puntajeTotal.toFixed(1),
      decision: decisionAjustada.texto,
      data: { infoGeneral, evaluaciones, gating, decisionComite, obsComite, condiciones, recursos, tipoApoyo }
    };
    const actualizadas = [nueva, ...evaluacionesGuardadas];
    setEvaluacionesGuardadas(actualizadas);
    localStorage.setItem('udd_evaluaciones_guardadas', JSON.stringify(actualizadas));
    setMensajeGuardado('✓ Evaluación guardada correctamente');
    setTimeout(() => setMensajeGuardado(''), 3000);
  };

  const cargarEvaluacion = (id) => {
    const ev = evaluacionesGuardadas.find(e => e.id === id);
    if (!ev) return;
    const d = ev.data;
    if (d.infoGeneral) setInfoGeneral(d.infoGeneral);
    if (d.evaluaciones) setEvaluaciones(d.evaluaciones);
    if (d.gating) setGating(d.gating);
    if (d.decisionComite) setDecisionComite(d.decisionComite);
    if (d.obsComite) setObsComite(d.obsComite);
    if (d.condiciones) setCondiciones(d.condiciones);
    if (d.recursos) setRecursos(d.recursos);
    if (d.tipoApoyo) setTipoApoyo(d.tipoApoyo);
    setMostrarGuardadas(false);
    setMensajeGuardado('✓ Evaluación cargada');
    setTimeout(() => setMensajeGuardado(''), 3000);
  };

  const eliminarEvaluacion = (id) => {
    if (!confirm('¿Eliminar esta evaluación guardada?')) return;
    const actualizadas = evaluacionesGuardadas.filter(e => e.id !== id);
    setEvaluacionesGuardadas(actualizadas);
    localStorage.setItem('udd_evaluaciones_guardadas', JSON.stringify(actualizadas));
  };

  const nuevaEvaluacion = () => {
    if (!confirm('¿Empezar una evaluación nueva? Asegúrate de haber guardado la actual. Todos los campos se borrarán.')) return;

    // Limpiar información general
    setInfoGeneral({ nombre: '', unidad: '', pi: '', fecha: '', evaluadores: [], evaluadorOtro: '', estado: '' });

    // Limpiar evaluaciones de criterios
    setEvaluaciones(Object.fromEntries(CRITERIOS.map(c => [c.id, { checks: c.checklist.map(() => false), notaFinal: null, evidencia: '', justificacion: '' }])));

    // Limpiar gating
    setGating(Object.fromEntries(DIMENSIONES_GATING.map(d => [d.id, { nivel: 'bajo', obs: '' }])));

    // Limpiar decisión del comité
    setDecisionComite('');
    setObsComite('');

    // Limpiar condiciones
    setCondiciones({ pi: false, validacion: false, propVal: false, modAdop: false, equipo: false, legal: false, etica: false, otros: false, otrosTexto: '' });

    // Limpiar recursos
    setRecursos('');
    setTipoApoyo({ financiamiento: false, vinculacion: false, validacion: false, roadmap: false, pi: false, transferencia: false, externo: false, otros: false, otrosTexto: '' });

    // Resetear secciones expandidas/colapsadas al estado inicial
    setSeccionesAbiertas({ info: true, principios: true, criterios: true, gating: true, comite: true, recursos: true, resumen: true });
    setCriteriosAbiertos(Object.fromEntries(CRITERIOS.map(c => [c.id, true])));

    // Cerrar panel de guardadas y limpiar mensajes
    setMostrarGuardadas(false);
    setMensajeGuardado('');

    // Limpiar también el borrador autoguardado
    try {
      localStorage.removeItem('udd_borrador_actual');
    } catch (e) {
      console.error(e);
    }

    // Subir scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setMensajeGuardado('✓ Evaluación nueva iniciada');
    setTimeout(() => setMensajeGuardado(''), 2500);
  };

  const exportarCSV = () => {
    if (evaluacionesGuardadas.length === 0) {
      alert('No hay evaluaciones guardadas para exportar');
      return;
    }
    const headers = ['Fecha Guardado', 'Proyecto', 'Facultad', 'Investigador Principal', 'Estado', 'Evaluadores', 'Puntaje Total', 'Decisión por puntaje', 'Decisión ajustada', 'Decisión Comité',
      ...CRITERIOS.map(c => `${c.nombre} (Nota)`),
      ...CRITERIOS.map(c => `${c.nombre} (Evidencia)`),
      ...DIMENSIONES_GATING.map(d => `Gating: ${d.nombre}`),
      'Observaciones Comité'];

    const rows = evaluacionesGuardadas.map(ev => {
      const d = ev.data;
      const evaluadoresTxt = d.infoGeneral.evaluadores.map(e => e === 'Otro' && d.infoGeneral.evaluadorOtro ? d.infoGeneral.evaluadorOtro : e).join('; ');
      const notas = CRITERIOS.map(c => {
        const checksCumplidos = d.evaluaciones[c.id].checks.filter(Boolean).length;
        const tieneEvidencia = d.evaluaciones[c.id].evidencia.trim().length > 0;
        const sugerida = calcularNotaSugerida(checksCumplidos, c.checklist.length, tieneEvidencia);
        return d.evaluaciones[c.id].notaFinal !== null ? d.evaluaciones[c.id].notaFinal : sugerida;
      });
      const evidencias = CRITERIOS.map(c => (d.evaluaciones[c.id].evidencia || '').replace(/"/g, '""'));
      const gatingNiveles = DIMENSIONES_GATING.map(dim => {
        const nivel = NIVELES_RIESGO.find(n => n.value === d.gating[dim.id].nivel);
        return nivel ? nivel.label : '';
      });

      return [ev.fechaGuardado, ev.proyecto, d.infoGeneral.unidad, d.infoGeneral.pi, d.infoGeneral.estado, evaluadoresTxt,
        ev.puntajeTotal, getDecisionPorPuntaje(parseFloat(ev.puntajeTotal)).texto, ev.decision, d.decisionComite || '',
        ...notas, ...evidencias, ...gatingNiveles, (d.obsComite || '').replace(/"/g, '""')];
    });

    const csv = [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/\n/g, ' ')}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evaluaciones_portafolio_IDi_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generarOnePager = () => {
    const w = window.open('', '_blank');
    if (!w) return;

    const evaluadoresTexto = infoGeneral.evaluadores.length > 0
      ? infoGeneral.evaluadores.map(e => e === 'Otro' && infoGeneral.evaluadorOtro ? infoGeneral.evaluadorOtro : e).join(', ')
      : 'No especificados';

    const fortalezas = calculosPorCriterio.filter(c => c.notaFinal >= 4).map(c => c.nombre);
    const brechas = calculosPorCriterio.filter(c => c.notaFinal <= 2).map(c => c.nombre);
    const riesgosActivos = DIMENSIONES_GATING.filter(d => gating[d.id].nivel !== 'bajo');

    const condicionesActivas = [];
    if (condiciones.pi) condicionesActivas.push('Resolver aspectos de PI');
    if (condiciones.validacion) condicionesActivas.push('Validación con actor(es) externo(s)');
    if (condiciones.propVal) condicionesActivas.push('Ajuste de propuesta de valor');
    if (condiciones.modAdop) condicionesActivas.push('Clarificar modelo de adopción');
    if (condiciones.equipo) condicionesActivas.push('Fortalecer equipo');
    if (condiciones.legal) condicionesActivas.push('Aspectos legales/regulatorios');
    if (condiciones.etica) condicionesActivas.push('Aspectos éticos/compliance');
    if (condiciones.otros && condiciones.otrosTexto) condicionesActivas.push(condiciones.otrosTexto);

    const apoyos = [];
    if (tipoApoyo.financiamiento) apoyos.push('Financiamiento');
    if (tipoApoyo.vinculacion) apoyos.push('Vinculación');
    if (tipoApoyo.validacion) apoyos.push('Validación');
    if (tipoApoyo.roadmap) apoyos.push('Roadmap');
    if (tipoApoyo.pi) apoyos.push('PI');
    if (tipoApoyo.transferencia) apoyos.push('Transferencia/adopción');
    if (tipoApoyo.externo) apoyos.push('Financiamiento externo');
    if (tipoApoyo.otros && tipoApoyo.otrosTexto) apoyos.push(tipoApoyo.otrosTexto);

    // Calcular puntos del radar chart
    const cx = 150, cy = 150, radius = 110;
    const angleStep = (2 * Math.PI) / 7;
    const radarPoints = calculosPorCriterio.map((c, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const r = (c.notaFinal / 5) * radius;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), label: c.nombre.split(' ')[0], nota: c.notaFinal, angle };
    });
    const radarPolygon = radarPoints.map(p => `${p.x},${p.y}`).join(' ');

    // Etiquetas en el radar
    const radarLabels = calculosPorCriterio.map((c, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const r = radius + 18;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), text: c.nombre, nota: c.notaFinal };
    });

    // Color decisión
    const colorDecision = decisionAjustada.color === 'emerald' ? '#10b981' :
                          decisionAjustada.color === 'amber' ? '#f59e0b' :
                          decisionAjustada.color === 'orange' ? '#fb923c' : '#ef4444';

    w.document.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>One-Pager - ${infoGeneral.nombre}</title>
<style>
  @page { size: A4 portrait; margin: 10mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; font-size: 9pt; line-height: 1.35; padding: 8mm; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #f59e0b; padding-bottom: 4mm; margin-bottom: 4mm; }
  .header-left h1 { font-size: 16pt; color: #0f172a; font-weight: 800; line-height: 1.15; margin-bottom: 2mm; max-width: 130mm; }
  .header-left .meta { font-size: 8pt; color: #64748b; }
  .header-left .meta strong { color: #1e293b; }
  .badge-score { background: ${colorDecision}; color: white; padding: 5mm 7mm; border-radius: 8px; text-align: center; min-width: 35mm; }
  .badge-score .score-num { font-size: 24pt; font-weight: 800; line-height: 1; }
  .badge-score .score-total { font-size: 8pt; opacity: 0.85; margin-bottom: 2mm; }
  .badge-score .score-label { font-size: 8pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1mm; }

  .grid-main { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-bottom: 4mm; }
  .card { border: 1px solid #cbd5e1; border-radius: 6px; padding: 3mm 4mm; }
  .card-title { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; margin-bottom: 2mm; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5mm; }

  .radar-container { display: flex; align-items: center; justify-content: center; }
  .radar-container svg { width: 100%; max-width: 75mm; height: auto; }

  .criteria-table { width: 100%; font-size: 8pt; border-collapse: collapse; }
  .criteria-table td { padding: 1.3mm 2mm; border-bottom: 1px solid #f1f5f9; }
  .criteria-table .nota-cell { text-align: center; font-weight: 700; width: 10mm; }
  .nota-5 { color: #065f46; }
  .nota-4 { color: #15803d; }
  .nota-3 { color: #b45309; }
  .nota-2, .nota-1 { color: #b91c1c; }
  .weight { color: #94a3b8; font-size: 7pt; }

  .decisions-row { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-bottom: 4mm; }
  .decision-box { padding: 3mm 4mm; border-radius: 6px; border-left: 4px solid; }
  .dec-puntaje { background: #f1f5f9; border-color: #64748b; }
  .dec-final { background: ${colorDecision}15; border-color: ${colorDecision}; }
  .decision-label { font-size: 7pt; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700; margin-bottom: 1mm; }
  .decision-value { font-size: 10pt; font-weight: 700; color: #0f172a; }

  .grid-bottom { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4mm; margin-bottom: 4mm; }
  .list-item { font-size: 8.5pt; padding: 1mm 0; border-bottom: 1px dotted #e2e8f0; }
  .list-item:last-child { border-bottom: none; }
  .empty { color: #94a3b8; font-style: italic; font-size: 8pt; }

  .gating-row { font-size: 8pt; display: flex; justify-content: space-between; padding: 1mm 0; border-bottom: 1px dotted #e2e8f0; }
  .gating-row:last-child { border-bottom: none; }
  .gating-status { font-weight: 700; }
  .gating-bajo { color: #065f46; }
  .gating-abordable { color: #b45309; }
  .gating-critico { color: #b91c1c; }

  .footer { border-top: 1px solid #e2e8f0; padding-top: 2.5mm; margin-top: 4mm; display: flex; justify-content: space-between; font-size: 7pt; color: #94a3b8; }

  .tag { display: inline-block; background: #f1f5f9; padding: 1mm 2.5mm; border-radius: 10px; font-size: 7.5pt; margin: 0.5mm; }

  .observaciones { font-size: 8pt; font-style: italic; color: #475569; line-height: 1.4; }

  .no-print { background: #f1f5f9; padding: 3mm 5mm; margin: -8mm -8mm 4mm -8mm; display: flex; justify-content: space-between; align-items: center; }
  .btn-print { background: #1e293b; color: white; border: none; padding: 2mm 5mm; border-radius: 4px; cursor: pointer; font-weight: 600; }
  @media print { .no-print { display: none !important; } body { padding: 0; } }
</style></head>
<body>

<div class="no-print">
  <span style="font-size: 9pt;">📄 One-Pager de evaluación. Apreta el botón para guardar como PDF.</span>
  <button class="btn-print" onclick="window.print()">Imprimir / Guardar PDF</button>
</div>

<div class="header">
  <div class="header-left">
    <h1>${infoGeneral.nombre || 'Proyecto sin nombre'}</h1>
    <div class="meta">
      <strong>PI:</strong> ${infoGeneral.pi || '—'} &nbsp;|&nbsp;
      <strong>Facultad:</strong> ${infoGeneral.unidad || '—'} &nbsp;|&nbsp;
      <strong>Estado:</strong> ${infoGeneral.estado || '—'}<br/>
      <strong>Evaluadores:</strong> ${evaluadoresTexto} &nbsp;|&nbsp;
      <strong>Fecha:</strong> ${infoGeneral.fecha || '—'}
    </div>
  </div>
  <div class="badge-score">
    <div class="score-num">${puntajeTotal.toFixed(0)}</div>
    <div class="score-total">/ 100 puntos</div>
    <div class="score-label">${decisionAjustada.texto}</div>
  </div>
</div>

<div class="decisions-row">
  <div class="decision-box dec-puntaje">
    <div class="decision-label">Decisión por puntaje</div>
    <div class="decision-value">${decisionPuntaje.texto}</div>
  </div>
  <div class="decision-box dec-final">
    <div class="decision-label">Decisión ajustada (con gating)</div>
    <div class="decision-value">${decisionAjustada.texto}</div>
  </div>
</div>

<div class="grid-main">
  <div class="card">
    <div class="card-title">Perfil de evaluación</div>
    <div class="radar-container">
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Círculos de fondo -->
        ${[1,2,3,4,5].map(level => `<circle cx="${cx}" cy="${cy}" r="${(level/5)*radius}" fill="none" stroke="#e2e8f0" stroke-width="0.5"/>`).join('')}
        <!-- Líneas radiales -->
        ${calculosPorCriterio.map((c, i) => {
          const angle = -Math.PI / 2 + i * angleStep;
          const x2 = cx + radius * Math.cos(angle);
          const y2 = cy + radius * Math.sin(angle);
          return `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#e2e8f0" stroke-width="0.5"/>`;
        }).join('')}
        <!-- Polígono de valores -->
        <polygon points="${radarPolygon}" fill="${colorDecision}40" stroke="${colorDecision}" stroke-width="2"/>
        <!-- Puntos -->
        ${radarPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${colorDecision}"/>`).join('')}
        <!-- Etiquetas -->
        ${radarLabels.map((l, i) => {
          const angle = -Math.PI / 2 + i * angleStep;
          const isRight = Math.cos(angle) > 0.1;
          const isLeft = Math.cos(angle) < -0.1;
          const anchor = isRight ? 'start' : isLeft ? 'end' : 'middle';
          const shortName = ['Alineación', 'Impacto', 'Madurez', 'Vinculación', 'Viabilidad', 'Factibilidad', 'Equipo'][i];
          return `<text x="${l.x}" y="${l.y}" text-anchor="${anchor}" font-size="9" fill="#475569" font-weight="600">${shortName} (${l.nota})</text>`;
        }).join('')}
      </svg>
    </div>
  </div>

  <div class="card">
    <div class="card-title">Notas por criterio</div>
    <table class="criteria-table">
      ${calculosPorCriterio.map(c => `
        <tr>
          <td>${c.nombre}<br/><span class="weight">Peso ${c.peso}% · Ponderado ${c.puntajePonderado.toFixed(1)}</span></td>
          <td class="nota-cell nota-${c.notaFinal}">${c.notaFinal}/5</td>
        </tr>
      `).join('')}
    </table>
  </div>
</div>

<div class="grid-bottom">
  <div class="card">
    <div class="card-title">✓ Fortalezas (nota ≥ 4)</div>
    ${fortalezas.length > 0
      ? fortalezas.map(f => `<div class="list-item">• ${f}</div>`).join('')
      : '<div class="empty">Sin fortalezas destacadas</div>'}
  </div>

  <div class="card">
    <div class="card-title">⚠ Brechas (nota ≤ 2)</div>
    ${brechas.length > 0
      ? brechas.map(b => `<div class="list-item">• ${b}</div>`).join('')
      : '<div class="empty">Sin brechas críticas</div>'}
  </div>

  <div class="card">
    <div class="card-title">🛡 Gating (riesgos habilitantes)</div>
    ${DIMENSIONES_GATING.map(d => {
      const nivel = gating[d.id].nivel;
      const label = nivel === 'bajo' ? 'Bajo' : nivel === 'abordable' ? 'Abordable' : 'Crítico';
      return `<div class="gating-row"><span>${d.nombre}</span><span class="gating-status gating-${nivel}">${label}</span></div>`;
    }).join('')}
  </div>
</div>

<div class="grid-main">
  <div class="card">
    <div class="card-title">📋 Condiciones recomendadas</div>
    ${condicionesActivas.length > 0
      ? condicionesActivas.map(c => `<span class="tag">${c}</span>`).join(' ')
      : '<div class="empty">Sin condiciones específicas</div>'}
  </div>

  <div class="card">
    <div class="card-title">💼 Apoyos sugeridos · Recursos: ${recursos || '—'}</div>
    ${apoyos.length > 0
      ? apoyos.map(a => `<span class="tag">${a}</span>`).join(' ')
      : '<div class="empty">Sin apoyos definidos</div>'}
  </div>
</div>

${obsComite ? `
<div class="card" style="margin-bottom: 4mm;">
  <div class="card-title">💬 Observaciones del comité</div>
  <div class="observaciones">${obsComite.replace(/</g, '&lt;').replace(/\n/g, '<br/>')}</div>
</div>` : ''}

<div class="footer">
  <span>Dirección de Desarrollo y Transferencia del Conocimiento · Universidad del Desarrollo</span>
  <span>Generado el ${new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
</div>

</body></html>`);
    w.document.close();
  };

  const SeccionHeader = ({ id, titulo, icon: Icon }) => (
    <button
      onClick={() => toggleSeccion(id)}
      className="w-full flex items-center justify-between bg-slate-800 text-white px-5 py-3 rounded-t-lg hover:bg-slate-700 transition-colors"
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon size={18} />}
        <span className="font-semibold text-base tracking-tight">{titulo}</span>
      </div>
      {seccionesAbiertas[id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-lg p-6 mb-4 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
            Herramienta de Evaluación — Portafolio I+D
          </h1>
          <p className="text-slate-300 text-sm">
            Ingreso, priorización y asignación de recursos · Dirección de Desarrollo y Transferencia del Conocimiento
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Universidad del Desarrollo
          </p>
        </div>

        {/* Barra de acciones */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4 shadow-sm flex flex-wrap items-center gap-2">
          <button onClick={guardarEvaluacion}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
            <Save size={15} /> Guardar evaluación
          </button>
          <button onClick={() => setMostrarGuardadas(!mostrarGuardadas)}
            className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-800 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
            <FolderOpen size={15} /> Evaluaciones guardadas ({evaluacionesGuardadas.length})
          </button>
          <button onClick={nuevaEvaluacion}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-3 py-2 rounded text-sm font-medium transition-colors">
            Nueva evaluación
          </button>
        </div>

        {mensajeGuardado && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded mb-4 text-sm">
            {mensajeGuardado}
          </div>
        )}

        {mostrarGuardadas && (
          <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-slate-800">Evaluaciones guardadas en este navegador</h3>
              <button onClick={() => setMostrarGuardadas(false)} className="text-slate-400 hover:text-slate-700">
                <XCircle size={18} />
              </button>
            </div>
            {evaluacionesGuardadas.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4 text-center">Aún no hay evaluaciones guardadas</p>
            ) : (
              <div className="space-y-2">
                {evaluacionesGuardadas.map(ev => (
                  <div key={ev.id} className="border border-slate-200 rounded p-3 flex items-center justify-between gap-3 hover:bg-slate-50">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-800 truncate">{ev.proyecto}</div>
                      <div className="text-xs text-slate-500">
                        Guardada el {ev.fechaGuardado} · Puntaje: <span className="font-semibold">{ev.puntajeTotal}/100</span> · {ev.decision}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => cargarEvaluacion(ev.id)}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-medium">
                        Cargar
                      </button>
                      <button onClick={() => eliminarEvaluacion(ev.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-2 py-1.5 rounded text-xs">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
              💡 Las evaluaciones se guardan en este navegador y computador. Para respaldar, usa "Exportar a Excel".
            </div>
          </div>
        )}

        {/* Información general */}
        <div className="mb-4">
          <SeccionHeader id="info" titulo="1. Información general del proyecto" icon={FileText} />
          {seccionesAbiertas.info && (
            <div className="bg-white border border-slate-200 rounded-b-lg p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nombre del proyecto</label>
                <select value={infoGeneral.nombre} onChange={e => {
                    const proy = PROYECTOS.find(p => p.nombre === e.target.value);
                    setInfoGeneral({
                      ...infoGeneral,
                      nombre: e.target.value,
                      unidad: proy ? proy.facultad : infoGeneral.unidad,
                      pi: proy ? proy.pi : infoGeneral.pi
                    });
                  }}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400">
                  <option value="">Seleccionar proyecto…</option>
                  {PROYECTOS.map((p, i) => <option key={i} value={p.nombre}>{i + 1}. {p.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Unidad(es) / Facultad(es)</label>
                <input type="text" value={infoGeneral.unidad} onChange={e => setInfoGeneral({...infoGeneral, unidad: e.target.value})}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Investigador/a principal</label>
                <input type="text" value={infoGeneral.pi} onChange={e => setInfoGeneral({...infoGeneral, pi: e.target.value})}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Fecha de evaluación</label>
                <input type="date" value={infoGeneral.fecha} onChange={e => setInfoGeneral({...infoGeneral, fecha: e.target.value})}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Estado</label>
                <select value={infoGeneral.estado} onChange={e => setInfoGeneral({...infoGeneral, estado: e.target.value})}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400">
                  <option value="">Seleccionar…</option>
                  <option value="Postulación ingreso a portafolio">Postulación ingreso a portafolio</option>
                  <option value="Presentación de hoja de ruta">Presentación de hoja de ruta</option>
                  <option value="Reevaluación hoja de ruta">Reevaluación hoja de ruta</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Evaluador(es)</label>
                <div className="flex flex-wrap gap-2">
                  {EVALUADORES.map(ev => (
                    <label key={ev} className={`flex items-center gap-1.5 border rounded-full px-3 py-1.5 cursor-pointer text-sm transition-colors ${
                      infoGeneral.evaluadores.includes(ev) ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-300 hover:bg-slate-50'
                    }`}>
                      <input
                        type="checkbox"
                        checked={infoGeneral.evaluadores.includes(ev)}
                        onChange={e => {
                          const nuevos = e.target.checked
                            ? [...infoGeneral.evaluadores, ev]
                            : infoGeneral.evaluadores.filter(x => x !== ev);
                          setInfoGeneral({...infoGeneral, evaluadores: nuevos});
                        }}
                        className="hidden"
                      />
                      {ev}
                    </label>
                  ))}
                </div>
                {infoGeneral.evaluadores.includes('Otro') && (
                  <input
                    type="text"
                    value={infoGeneral.evaluadorOtro}
                    onChange={e => setInfoGeneral({...infoGeneral, evaluadorOtro: e.target.value})}
                    placeholder="Especificar nombre de otro evaluador…"
                    className="mt-2 w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Principios */}
        <div className="mb-4">
          <SeccionHeader id="principios" titulo="2. Principios de evaluación" icon={Info} />
          {seccionesAbiertas.principios && (
            <div className="bg-white border border-slate-200 rounded-b-lg p-5">
              <ul className="space-y-2 text-sm text-slate-700 mb-4">
                <li className="flex gap-2"><span className="text-slate-400">›</span> Evaluar evidencia, no narrativa</li>
                <li className="flex gap-2"><span className="text-slate-400">›</span> Evaluar potencial realista, no intención</li>
                <li className="flex gap-2"><span className="text-slate-400">›</span> Considerar trayectoria posible, no solo estado actual</li>
                <li className="flex gap-2"><span className="text-slate-400">›</span> Separar calidad del proyecto, calidad del equipo y nivel de avance</li>
                <li className="flex gap-2"><span className="text-slate-400">›</span> El score 3 no es malo: representa una base aceptable</li>
                <li className="flex gap-2"><span className="text-slate-400">›</span> El score 5 requiere evidencia clara, robusta y verificable</li>
              </ul>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">ESCALA GENERAL</p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
                  <div className="bg-red-50 border border-red-200 rounded p-2"><span className="font-bold text-red-700">1</span> · Muy bajo / inexistente</div>
                  <div className="bg-orange-50 border border-orange-200 rounded p-2"><span className="font-bold text-orange-700">2</span> · Bajo / incipiente</div>
                  <div className="bg-amber-50 border border-amber-200 rounded p-2"><span className="font-bold text-amber-700">3</span> · Medio / base aceptable</div>
                  <div className="bg-lime-50 border border-lime-200 rounded p-2"><span className="font-bold text-lime-700">4</span> · Alto / sólido</div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded p-2"><span className="font-bold text-emerald-700">5</span> · Sobresaliente / robusto</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Criterios */}
        <div className="mb-4">
          <SeccionHeader id="criterios" titulo="3. Criterios de evaluación" icon={CheckCircle2} />
          {seccionesAbiertas.criterios && (
            <div className="bg-white border border-slate-200 rounded-b-lg p-3 space-y-3">
              {calculosPorCriterio.map((c, idx) => {
                const ev = evaluaciones[c.id];
                const colorBarra = c.notaFinal >= 4 ? 'bg-emerald-500' : c.notaFinal === 3 ? 'bg-amber-500' : 'bg-red-500';
                return (
                  <div key={c.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCriterio(c.id)}
                      className="w-full flex items-center justify-between bg-slate-100 hover:bg-slate-200 px-4 py-3 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <span className="bg-slate-700 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{idx + 1}</span>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{c.nombre}</div>
                          <div className="text-xs text-slate-500">Peso: {c.peso}% · Nota: {c.notaFinal} · Ponderado: {c.puntajePonderado.toFixed(1)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-8 rounded ${colorBarra}`} />
                        {criteriosAbiertos[c.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </button>

                    {criteriosAbiertos[c.id] && (
                      <div className="p-4 bg-white space-y-4">
                        <p className="text-xs text-slate-600 italic border-l-2 border-slate-300 pl-3">
                          {c.definicion}
                        </p>

                        {c.nota && (
                          <div className="text-xs bg-blue-50 border border-blue-200 text-blue-900 rounded p-2 flex gap-2">
                            <Info size={14} className="flex-shrink-0 mt-0.5" />
                            <span>{c.nota}</span>
                          </div>
                        )}

                        <div>
                          <p className="text-xs font-semibold text-slate-600 mb-2">CHECKLIST</p>
                          <div className="space-y-2">
                            {c.checklist.map((item, i) => (
                              <label key={i} className="flex items-start gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                                <input
                                  type="checkbox"
                                  checked={ev.checks[i]}
                                  onChange={e => updateCheck(c.id, i, e.target.checked)}
                                  className="mt-0.5 w-4 h-4 accent-slate-700"
                                />
                                <span className="text-sm text-slate-700">{item}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {c.ayuda && (
                          <div className="bg-slate-50 border border-slate-200 rounded p-3">
                            <p className="text-xs font-semibold text-slate-600 mb-2">{c.ayuda.titulo}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {c.ayuda.items.map((item, i) => (
                                <span key={i} className="text-xs bg-white border border-slate-300 px-2 py-0.5 rounded-full text-slate-700">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded">
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Checks cumplidos</p>
                            <p className="text-lg font-bold text-slate-800">{c.checksCumplidos} / {c.totalChecks}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Nota sugerida</p>
                            <p className="text-lg font-bold text-slate-800">{c.notaSugerida}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Nota final</p>
                            <select
                              value={ev.notaFinal !== null ? ev.notaFinal : c.notaSugerida}
                              onChange={e => updateEvaluacion(c.id, 'notaFinal', parseInt(e.target.value))}
                              className="w-full border border-slate-300 rounded px-2 py-1 text-sm font-bold bg-white"
                            >
                              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Puntaje ponderado</p>
                            <p className="text-lg font-bold text-slate-800">{c.puntajePonderado.toFixed(2)}</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Evidencia observada / comentarios del evaluador
                          </label>
                          <textarea
                            value={ev.evidencia}
                            onChange={e => updateEvaluacion(c.id, 'evidencia', e.target.value)}
                            rows={2}
                            placeholder="Describir evidencia concreta observada…"
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                          />
                          {c.checksCumplidos === c.totalChecks && !c.tieneEvidencia && (
                            <p className="text-xs text-amber-700 mt-1 flex items-center gap-1">
                              <AlertCircle size={12} /> Para alcanzar nota 5 se requiere evidencia escrita.
                            </p>
                          )}
                        </div>

                        {c.requiereJustificacion && (
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              Justificación del ajuste <span className="text-red-600">*</span>
                            </label>
                            <textarea
                              value={ev.justificacion}
                              onChange={e => updateEvaluacion(c.id, 'justificacion', e.target.value)}
                              rows={2}
                              placeholder={`La nota final (${c.notaFinal}) difiere de la sugerida (${c.notaSugerida}). Justificar.`}
                              className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${c.justificacionFaltante ? 'border-red-400 focus:ring-red-400 bg-red-50' : 'border-slate-300 focus:ring-slate-400'}`}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Gating */}
        <div className="mb-4">
          <SeccionHeader id="gating" titulo="4. Condiciones habilitantes (gating)" icon={AlertTriangle} />
          {seccionesAbiertas.gating && (
            <div className="bg-white border border-slate-200 rounded-b-lg p-5">
              <p className="text-sm font-semibold text-slate-800 mb-1">¿Existen riesgos críticos no resueltos?</p>
              <p className="text-xs text-slate-500 mb-4">
                Esta evaluación es independiente del puntaje y puede modificar la decisión final.
              </p>
              <div className="space-y-3">
                {DIMENSIONES_GATING.map(dim => {
                  const nivelActual = NIVELES_RIESGO.find(n => n.value === gating[dim.id].nivel);
                  const colorBg = nivelActual.color === 'green' ? 'bg-emerald-50 border-emerald-200' :
                                  nivelActual.color === 'amber' ? 'bg-amber-50 border-amber-200' :
                                  'bg-red-50 border-red-200';
                  return (
                    <div key={dim.id} className={`border rounded-lg p-3 ${colorBg}`}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                        <div className="font-medium text-sm text-slate-800">{dim.nombre}</div>
                        <select
                          value={gating[dim.id].nivel}
                          onChange={e => setGating(g => ({ ...g, [dim.id]: { ...g[dim.id], nivel: e.target.value } }))}
                          className="border border-slate-300 rounded px-2 py-1.5 text-sm bg-white"
                        >
                          {NIVELES_RIESGO.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                        </select>
                        <input
                          type="text"
                          value={gating[dim.id].obs}
                          onChange={e => setGating(g => ({ ...g, [dim.id]: { ...g[dim.id], obs: e.target.value } }))}
                          placeholder="Observaciones…"
                          className="border border-slate-300 rounded px-2 py-1.5 text-sm bg-white"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Resultado y Decisión */}
        <div className="mb-4 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-slate-800 text-white px-5 py-3">
            <span className="font-semibold text-base">5. Resultado cuantitativo</span>
          </div>
          <div className="p-5">
            {/* Tabla resumen */}
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold">Criterio</th>
                    <th className="text-center px-2 py-2 font-semibold">Peso</th>
                    <th className="text-center px-2 py-2 font-semibold">Checks</th>
                    <th className="text-center px-2 py-2 font-semibold">Sugerida</th>
                    <th className="text-center px-2 py-2 font-semibold">Final</th>
                    <th className="text-center px-2 py-2 font-semibold">Ponderado</th>
                  </tr>
                </thead>
                <tbody>
                  {calculosPorCriterio.map(c => (
                    <tr key={c.id} className="border-b border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{c.nombre}</td>
                      <td className="text-center px-2 py-2 text-slate-600">{c.peso}%</td>
                      <td className="text-center px-2 py-2 text-slate-600">{c.checksCumplidos}/{c.totalChecks}</td>
                      <td className="text-center px-2 py-2 text-slate-600">{c.notaSugerida}</td>
                      <td className="text-center px-2 py-2 font-semibold text-slate-800">{c.notaFinal}</td>
                      <td className="text-center px-2 py-2 font-semibold text-slate-800">{c.puntajePonderado.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-bold">
                    <td colSpan={5} className="px-3 py-2 text-right text-slate-700">PUNTAJE TOTAL</td>
                    <td className="text-center px-2 py-2 text-slate-900 text-base">{puntajeTotal.toFixed(1)} / 100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Barra de progreso */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>0</span><span>50</span><span>65</span><span>80</span><span>100</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 relative overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all ${
                    decisionPuntaje.color === 'emerald' ? 'bg-emerald-500' :
                    decisionPuntaje.color === 'amber' ? 'bg-amber-500' :
                    decisionPuntaje.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(puntajeTotal, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>No ingreso</span><span>Reformular</span><span>Condicionado</span><span>Prioritario</span>
              </div>
            </div>

            {/* Decisiones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`rounded-lg p-4 border-2 ${
                decisionPuntaje.color === 'emerald' ? 'bg-emerald-50 border-emerald-300' :
                decisionPuntaje.color === 'amber' ? 'bg-amber-50 border-amber-300' :
                decisionPuntaje.color === 'orange' ? 'bg-orange-50 border-orange-300' : 'bg-red-50 border-red-300'
              }`}>
                <p className="text-xs font-semibold text-slate-600 mb-1">DECISIÓN SEGÚN PUNTAJE</p>
                <p className="text-lg font-bold text-slate-900">{decisionPuntaje.texto}</p>
              </div>
              <div className={`rounded-lg p-4 border-2 ${
                decisionAjustada.color === 'emerald' ? 'bg-emerald-50 border-emerald-300' :
                decisionAjustada.color === 'amber' ? 'bg-amber-50 border-amber-300' :
                decisionAjustada.color === 'orange' ? 'bg-orange-50 border-orange-300' : 'bg-red-50 border-red-300'
              }`}>
                <p className="text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                  DECISIÓN AJUSTADA POR GATING
                  {decisionAjustada.alerta && <AlertTriangle size={12} className="text-red-600" />}
                </p>
                <p className="text-lg font-bold text-slate-900">{decisionAjustada.texto}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comité */}
        <div className="mb-4">
          <SeccionHeader id="comite" titulo="6. Decisión del comité" icon={CheckCircle2} />
          {seccionesAbiertas.comite && (
            <div className="bg-white border border-slate-200 rounded-b-lg p-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">DECISIÓN FINAL DEL COMITÉ</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {['Ingreso prioritario', 'Ingreso condicionado', 'Reformulación requerida', 'No ingreso'].map(op => (
                    <label key={op} className={`border rounded p-2.5 cursor-pointer text-sm text-center transition-colors ${
                      decisionComite === op ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-300 hover:bg-slate-50'
                    }`}>
                      <input type="radio" checked={decisionComite === op} onChange={() => setDecisionComite(op)} className="hidden" />
                      {op}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">CONDICIONES (SI APLICA)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { key: 'pi', label: 'Resolver aspectos de PI' },
                    { key: 'validacion', label: 'Validación con actor(es) externo(s)' },
                    { key: 'propVal', label: 'Ajuste de propuesta de valor' },
                    { key: 'modAdop', label: 'Clarificar modelo de adopción' },
                    { key: 'equipo', label: 'Fortalecer equipo' },
                    { key: 'legal', label: 'Resolver aspectos legales/regulatorios' },
                    { key: 'etica', label: 'Resolver aspectos éticos/compliance' }
                  ].map(c => (
                    <label key={c.key} className="flex items-center gap-2 text-sm cursor-pointer p-1.5 hover:bg-slate-50 rounded">
                      <input type="checkbox" checked={condiciones[c.key]} onChange={e => setCondiciones({...condiciones, [c.key]: e.target.checked})} className="w-4 h-4 accent-slate-700" />
                      {c.label}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-sm cursor-pointer p-1.5 hover:bg-slate-50 rounded md:col-span-2">
                    <input type="checkbox" checked={condiciones.otros} onChange={e => setCondiciones({...condiciones, otros: e.target.checked})} className="w-4 h-4 accent-slate-700" />
                    <span>Otros:</span>
                    <input type="text" value={condiciones.otrosTexto} onChange={e => setCondiciones({...condiciones, otrosTexto: e.target.value})}
                      className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm" placeholder="Especificar…" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Observaciones finales del comité</label>
                <textarea value={obsComite} onChange={e => setObsComite(e.target.value)} rows={3}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
              </div>
            </div>
          )}
        </div>

        {/* Recursos */}
        <div className="mb-4">
          <SeccionHeader id="recursos" titulo="7. Recomendación de recursos" icon={CheckCircle2} />
          {seccionesAbiertas.recursos && (
            <div className="bg-white border border-slate-200 rounded-b-lg p-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">¿SE RECOMIENDA ASIGNAR RECURSOS?</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Sí', 'No', 'Condicionado'].map(op => (
                    <label key={op} className={`border rounded p-2.5 cursor-pointer text-sm text-center transition-colors ${
                      recursos === op ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-300 hover:bg-slate-50'
                    }`}>
                      <input type="radio" checked={recursos === op} onChange={() => setRecursos(op)} className="hidden" />
                      {op}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">TIPO DE APOYO SUGERIDO</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { key: 'financiamiento', label: 'Financiamiento' },
                    { key: 'vinculacion', label: 'Vinculación con actores' },
                    { key: 'validacion', label: 'Apoyo en validación' },
                    { key: 'roadmap', label: 'Apoyo en roadmap' },
                    { key: 'pi', label: 'Apoyo en PI' },
                    { key: 'transferencia', label: 'Apoyo en modelo de transferencia/adopción' },
                    { key: 'externo', label: 'Apoyo en búsqueda de financiamiento externo o no tradicional' }
                  ].map(t => (
                    <label key={t.key} className="flex items-center gap-2 text-sm cursor-pointer p-1.5 hover:bg-slate-50 rounded">
                      <input type="checkbox" checked={tipoApoyo[t.key]} onChange={e => setTipoApoyo({...tipoApoyo, [t.key]: e.target.checked})} className="w-4 h-4 accent-slate-700" />
                      {t.label}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-sm cursor-pointer p-1.5 hover:bg-slate-50 rounded md:col-span-2">
                    <input type="checkbox" checked={tipoApoyo.otros} onChange={e => setTipoApoyo({...tipoApoyo, otros: e.target.checked})} className="w-4 h-4 accent-slate-700" />
                    <span>Otros:</span>
                    <input type="text" value={tipoApoyo.otrosTexto} onChange={e => setTipoApoyo({...tipoApoyo, otrosTexto: e.target.value})}
                      className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm" placeholder="Especificar…" />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resumen ejecutivo */}
        <div className="mb-4">
          <SeccionHeader id="resumen" titulo="8. Resumen ejecutivo final" icon={FileText} />
          {seccionesAbiertas.resumen && (
            <div className="bg-white border border-slate-200 rounded-b-lg p-5">
              <div className="flex justify-end mb-3">
                <button
                  onClick={copiarResumen}
                  className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                    copiado ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {copiado ? <><CheckCircle2 size={16} /> Copiado</> : <><Copy size={16} /> Copiar resumen</>}
                </button>
              </div>
              <pre className="bg-slate-50 border border-slate-200 rounded p-4 text-xs text-slate-800 whitespace-pre-wrap font-mono overflow-x-auto max-h-96 overflow-y-auto">
                {generarResumen()}
              </pre>
            </div>
          )}
        </div>

        {/* Acciones finales */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Finalizar evaluación</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={guardarEvaluacion}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded text-sm font-medium transition-colors">
              <Save size={16} /> Guardar evaluación
            </button>
            <button onClick={exportarCSV} disabled={evaluacionesGuardadas.length === 0}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded text-sm font-medium transition-colors">
              <Download size={16} /> Exportar a Excel
            </button>
            <button onClick={generarOnePager} disabled={!infoGeneral.nombre}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded text-sm font-medium transition-colors">
              <Printer size={16} /> One-pager visual (PDF)
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            💡 "Guardar evaluación" archiva la evaluación actual en este navegador. "Exportar a Excel" descarga todas las evaluaciones guardadas. "Imprimir / PDF" genera el resumen ejecutivo formateado.
          </p>
        </div>

        <div className="text-center text-xs text-slate-400 py-4">
          Dirección de Desarrollo y Transferencia del Conocimiento · UDD
        </div>
      </div>
    </div>
  );
}
