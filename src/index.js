// @ts-check
/**
 * @file index.js
 * @description Programa simple con clases en español, usando tipado fuerte con @ts-check y JSDoc.
 *              Demuestra variables (string, entero, double), clases y métodos.
 *              Imprime información de artículos en consola.
 * @author
 *   Victor
 * @version 1.0.0
 * @since 2025-10-16
 */

/* =========================
 * Variables globales tipadas
 * ========================= */

/**
 * Nombre de la tienda.
 * @type {string}
 */
const nombreTienda = "Papelería Central";

/**
 * Número de caja (entero).
 * @type {number}
 */
const numeroCaja = 1;

/**
 * Tasa de IVA (double).
 * @type {number}
 */
const IVA_POR_DEFECTO = 0.21;

/* =========================
 * Funciones auxiliares
 * ========================= */

/**
 * Redondea un número a 2 decimales.
 * @param {number} n - Número a redondear.
 * @returns {number} Número redondeado.
 */
function redondear2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/* =========================
 * Clase Articulo
 * ========================= */

/**
 * Representa un artículo con nombre, precio, cantidad e IVA.
 * @class
 */
class Articulo {
  /**
   * Crea un artículo.
   * @param {string} nombre - Nombre del artículo.
   * @param {number} precioUnitario - Precio por unidad (sin IVA).
   * @param {number} cantidad - Cantidad inicial (entero >= 0).
   * @param {number} [iva=IVA_POR_DEFECTO] - Tasa de IVA (0..1).
   */
  constructor(nombre, precioUnitario, cantidad, iva = IVA_POR_DEFECTO) {
    /**
     * Nombre del artículo.
     * @type {string}
     */
    this.nombre = nombre;

    /**
     * Precio por unidad (sin IVA).
     * @type {number}
     */
    this.precioUnitario = precioUnitario;

    /**
     * Cantidad actual (entero >= 0).
     * @type {number}
     */
    this.cantidad = Math.max(0, Math.trunc(cantidad));

    /**
     * Tasa de IVA (0..1).
     * @type {number}
     */
    this.iva = Math.min(1, Math.max(0, iva));
  }

  /**
   * Calcula el subtotal sin impuestos.
   * @returns {number} Subtotal (precioUnitario * cantidad).
   */
  subtotal() {
    return redondear2(this.precioUnitario * this.cantidad);
  }

  /**
   * Calcula el total con IVA.
   * @returns {number} Total con IVA aplicado.
   */
  totalConIva() {
    return redondear2(this.subtotal() * (1 + this.iva));
  }

  /**
   * Cambia la cantidad sumando o restando unidades.
   * @param {number} delta - Valor a sumar (positivo o negativo).
   * @returns {number} Nueva cantidad.
   */
  cambiarCantidad(delta) {
    const nueva = Math.trunc(this.cantidad + delta);
    this.cantidad = Math.max(0, nueva);
    return this.cantidad;
  }

  /**
   * Devuelve una descripción resumida del artículo.
   * @returns {string} Texto legible con los datos del artículo.
   */
  resumen() {
    return `Artículo: ${this.nombre} | Cantidad: ${this.cantidad} | Precio: ${this.precioUnitario.toFixed(2)} | Subtotal: ${this.subtotal().toFixed(2)} | Total con IVA: ${this.totalConIva().toFixed(2)}`;
  }
}

/* =========================
 * Clase Impresora
 * ========================= */

/**
 * Clase encargada de imprimir artículos (SRP: una sola responsabilidad).
 * @class
 */
class Impresora {
  /**
   * Crea una impresora.
   * @param {string} titulo - Título o encabezado del ticket.
   */
  constructor(titulo) {
    /**
     * Título del ticket.
     * @type {string}
     */
    this.titulo = titulo;
  }

  /**
   * Imprime una cabecera simple.
   * @param {string} tienda - Nombre de la tienda.
   * @param {number} nroCaja - Número de caja.
   */
  imprimirCabecera(tienda, nroCaja) {
    console.log(`\n===== ${this.titulo.toUpperCase()} =====`);
    console.log(`Tienda: ${tienda}`);
    console.log(`Caja Nº: ${Math.trunc(nroCaja)}`);
    console.log(`Fecha: ${new Date().toLocaleString()}\n`);
  }

  /**
   * Imprime la información de un artículo.
   * @param {Articulo} articulo - Instancia de la clase Articulo.
   */
  imprimirArticulo(articulo) {
    console.log(articulo.resumen());
  }

  /**
   * Imprime el total general del ticket.
   * @param {number} total - Importe final.
   */
  imprimirTotal(total) {
    console.log(`\nTOTAL A PAGAR: ${total.toFixed(2)} €`);
    console.log("=====================================\n");
  }
}

/* =========================
 * Programa principal
 * ========================= */

/**
 * Función principal del programa.
 */
function main() {
  const impresora = new Impresora("Ticket de Compra");
  impresora.imprimirCabecera(nombreTienda, numeroCaja);

  // 1️⃣ Primer uso: crear artículo y mostrarlo
  const cuaderno = new Articulo("Cuaderno A5", 3.5, 2);
  impresora.imprimirArticulo(cuaderno);

  // 2️⃣ Segundo uso: cambiar cantidad y volver a imprimir
  cuaderno.cambiarCantidad(3); // ahora cantidad = 5
  impresora.imprimirArticulo(cuaderno);

  // 3️⃣ Tercer uso: crear otro artículo y mostrarlo
  const boligrafo = new Articulo("Bolígrafo azul", 1.2, 4, 0.10);
  impresora.imprimirArticulo(boligrafo);

  // Calcular total combinado
  const totalFinal = redondear2(cuaderno.totalConIva() + boligrafo.totalConIva());
  impresora.imprimirTotal(totalFinal);
}

/* =========================
 * Llamada directa a main
 * ========================= */
main();
