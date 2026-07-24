// ---- Textos legales ----
export const TEXTOS_LEGALES = {
  terminos: {
    titulo: 'Términos y Condiciones',
    contenido: (
      <>
        <p>Huele Candela es un catálogo digital operado por una persona natural, sin que ello implique la constitución de una sociedad mercantil. Al navegar y hacer uso de este sitio, aceptas los términos aquí descritos.</p>
        <h5>1. Naturaleza del sitio</h5>
        <p>Este sitio web funciona como catálogo virtual de perfumes. No se procesan pagos ni compras directamente en la página: cada pedido se coordina de forma manual a través de WhatsApp, donde se confirman disponibilidad, precio final, forma de pago y método de entrega antes de formalizar la venta.</p>
        <h5>2. Precios y disponibilidad</h5>
        <p>Los precios mostrados (al detal y al mayor) están expresados en dólares estadounidenses (USD) y pueden cambiar sin previo aviso debido a fluctuaciones del mercado o de proveedores. Los productos marcados como "Consultar" no tienen un precio publicado y deben cotizarse directamente por WhatsApp. La disponibilidad de cada perfume se confirma al momento del pedido, ya que el inventario puede variar.</p>
        <h5>3. Proceso de compra</h5>
        <p>Al añadir productos al carrito y pulsar "Enviar a WhatsApp", se genera un mensaje con el resumen de tu pedido que se envía a través de tu propia aplicación de WhatsApp. La venta se considera formalizada únicamente cuando ambas partes acuerdan los detalles finales (precio, pago y entrega) por ese medio.</p>
        <h5>4. Envíos y entregas</h5>
        <p>Las condiciones de envío (zona, costo y tiempo estimado) se coordinan caso por caso vía WhatsApp. Huele Candela no se hace responsable por retrasos ocasionados por empresas de mensajería o transporte externas una vez el pedido ha sido despachado.</p>
        <h5>5. Cambios y devoluciones</h5>
        <p>Por tratarse de productos de perfumería, no se aceptan devoluciones una vez el producto ha sido abierto o usado, salvo defecto de fábrica comprobado. Cualquier inconformidad debe reportarse dentro de las 24 horas siguientes a la entrega, a través de WhatsApp, adjuntando evidencia (fotos o video).</p>
        <h5>6. Marcas registradas</h5>
        <p>Los nombres de marcas, casas de perfumería y diseñadores que aparecen en este catálogo (como referencia de línea, familia olfativa o inspiración) son propiedad de sus respectivos dueños. Su mención tiene fines meramente descriptivos e identificativos, y no implica afiliación, patrocinio ni asociación comercial entre esas marcas y Huele Candela.</p>
        <h5>7. Legislación aplicable</h5>
        <p>Estos términos se rigen por las leyes de la República Bolivariana de Venezuela. Cualquier controversia se intentará resolver primero de forma amistosa a través de los canales de contacto del negocio.</p>
        <p className="text-gray-500 text-xs mt-6">Última actualización: {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
      </>
    ),
  },
  privacidad: {
    titulo: 'Política de Privacidad',
    contenido: (
      <>
        <p>En Huele Candela respetamos tu privacidad. Esta página explica qué información se maneja cuando usas este catálogo y cómo se trata.</p>
        <h5>1. Responsable del tratamiento</h5>
        <p>Este sitio es operado por una persona natural bajo el nombre comercial "Huele Candela". Para cualquier consulta sobre tus datos puedes escribir por WhatsApp o Instagram, canales listados al pie de esta página.</p>
        <h5>2. Qué datos se recopilan</h5>
        <p>Este catálogo no tiene servidores propios de base de datos ni formularios que almacenen información en línea. Los únicos datos que se solicitan son los que tú mismo escribes voluntariamente en el formulario de "Datos de envío" (nombre, dirección y notas opcionales) al finalizar un pedido. Esa información se usa exclusivamente para armar el mensaje que se envía a través de tu propia app de WhatsApp — nunca se guarda en ningún servidor ni base de datos de Huele Candela.</p>
        <h5>3. Uso de la información</h5>
        <p>Los datos de envío que compartes se usan únicamente para coordinar tu pedido (confirmar dirección, forma de entrega y contacto). No se venden, alquilan ni comparten con terceros con fines publicitarios.</p>
        <h5>4. Servicios de terceros</h5>
        <p>Este sitio utiliza los siguientes servicios externos, cada uno con su propia política de privacidad:</p>
        <ul>
          <li><strong>WhatsApp / Meta:</strong> para recibir y coordinar pedidos y consultas.</li>
          <li><strong>Vercel:</strong> plataforma de hosting donde está alojado el sitio.</li>
          <li><strong>Google Fonts:</strong> para cargar las tipografías del sitio, lo que puede implicar que tu navegador se conecte a servidores de Google.</li>
        </ul>
        <h5>5. Tus derechos</h5>
        <p>Puedes solicitar en cualquier momento que se aclare qué información recibimos de ti o pedir que no se use más, escribiendo directamente por WhatsApp o Instagram.</p>
        <p className="text-gray-500 text-xs mt-6">Última actualización: {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
      </>
    ),
  },
  cookies: {
    titulo: 'Política de Cookies',
    contenido: (
      <>
        <p>Este sitio no utiliza cookies de rastreo, publicidad ni analítica de terceros. No implementamos Google Analytics, píxeles de Facebook/Meta ni ningún sistema de seguimiento de comportamiento.</p>
        <h5>1. Almacenamiento local</h5>
        <p>El catálogo funciona completamente en tu navegador: el carrito de compras se guarda temporalmente en la memoria de la página mientras la tienes abierta, y se borra al cerrarla o recargarla. No se guarda información en cookies persistentes de nuestro lado.</p>
        <h5>2. Servicios externos</h5>
        <p>Al cargar las tipografías del sitio, tu navegador se conecta a servidores de Google Fonts, lo que técnicamente implica compartir tu dirección IP con Google, según su propia política. No usamos ningún dato adicional de esa conexión.</p>
        <h5>3. Control desde tu navegador</h5>
        <p>Aunque este sitio no depende de cookies para funcionar, siempre puedes revisar y borrar cualquier dato almacenado por tu navegador desde su configuración de privacidad.</p>
        <p className="text-gray-500 text-xs mt-6">Última actualización: {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
      </>
    ),
  },
  descargo: {
    titulo: 'Descargo de Responsabilidad',
    contenido: (
      <>
        <p>La información y las imágenes presentadas en este catálogo se ofrecen con fines informativos y comerciales, y se procura que sean lo más precisas posible.</p>
        <h5>1. Imágenes de referencia</h5>
        <p>Las fotografías de los productos pueden provenir del fabricante o distribuidor y son usadas como referencia visual. El empaque, la presentación o el diseño de la botella real pueden variar ligeramente respecto a la imagen mostrada (por ediciones, lotes o actualizaciones del fabricante), sin que eso afecte la autenticidad del producto.</p>
        <h5>2. Perfumes originales e inspirados</h5>
        <p>El catálogo incluye tanto perfumes originales de casas reconocidas (Lattafa, Armaf, Afnan, entre otras) como fragancias de otras marcas de perfumería inspiradas en familias olfativas populares. Cuando corresponda, cualquier mención comparativa con marcas de diseñador es únicamente referencial y no implica que el producto sea fabricado, distribuido o respaldado por esa casa de moda.</p>
        <h5>3. Sin responsabilidad por uso indebido</h5>
        <p>Huele Candela no se hace responsable por reacciones alérgicas o efectos adversos derivados del uso de los productos. Se recomienda realizar una prueba de contacto antes del uso habitual si tienes piel sensible.</p>
        <h5>4. Disponibilidad de la información</h5>
        <p>Este sitio puede contener errores tipográficos o de precio de forma involuntaria. Nos reservamos el derecho de corregir dicha información en cualquier momento sin previo aviso.</p>
        <p className="text-gray-500 text-xs mt-6">Última actualización: {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
      </>
    ),
  },
};
