'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TermsAndConditions = () => {
  useEffect(() => {
    // Añadir desplazamiento suave
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  }, []);

  const router = useRouter();

  const goBack = () => {
    router.push('/');
  };

  const sections = [
    { id: 'introduccion', title: 'INTRODUCCION' },
    { id: 'politica-privacidad', title: 'POLÍTICA DE PRIVACIDAD' },
    { id: 'politica-anti-spam', title: 'POLÍTICA ANTI-SPAM' },
    { id: 'cumplimiento-indotel', title: 'CUMPLIMIENTO CON LEYES DE INDOTEL' },
    { id: 'procedimiento-queja', title: 'PROCEDIMIENTO DE QUEJA' },
  ];

  return (
    <div className="flex">
      <nav className="w-1/4 bg-gray-100 p-4">
        <button
          onClick={goBack}
          className="mb-4 rounded bg-black   px-4 py-2 font-bold text-white hover:bg-white hover:text-black"
        >
          Volver a la página anterior
        </button>
        <h3 className="mb-4 text-xl font-bold">Navegacion</h3>
        <ol>
          {sections.map((section, index) => (
            <li key={section.id} className="mb-2">
              <Link
                href={`#${section.id}`}
                className="text-black hover:underline"
              >
                {index + 1}. {section.title}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <main className="w-3/4 p-4">
        <h2 className="mb-4 text-2xl font-bold">Términos y Condiciones</h2>
        <p className="mb-4">
          Al continuar aceptas de igual forma lo dispuesto en la Política de
          Privacidad y en la Autorización para el Tratamiento de Datos.
        </p>

        <section id="introduccion" className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">1. INTRODUCCION</h3>
          <p>Política de Privacidad y Anti-Spam de UnityFull SRL</p>
          <p>
            En UnityFull SRL valoramos el derecho a la privacidad de sus datos
            personales y nos comprometemos a proteger su información de acuerdo
            con las regulaciones de protección de datos vigentes, como la Ley
            No. 172-13 y las disposiciones de INDOTEL.
          </p>
        </section>

        <section id="politica-privacidad" className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">
            2. POLÍTICA DE PRIVACIDAD
          </h3>
          <p>
            El propósito de esta Política de Privacidad es informar a nuestros
            clientes sobre el tipo de datos que pueden ser recolectados durante
            la visita a nuestro sitio, el uso que podemos darle a esta
            información, si esta puede ser compartida con terceros, y las
            opciones que tienen los usuarios para corregir o actualizar su
            información. Durante el proceso de registro, los datos que
            recopilaremos incluyen: Dirección de correo electrónico Clave de
            seguridad Nombres y apellidos Domicilio y número telefónico Datos de
            facturación Estos datos nos permitirán mejorar su experiencia,
            asistirle con cuestiones de servicio al cliente y mantenerle
            informado sobre actualizaciones, promociones especiales y productos
            de interés. UnityFull SRL trata esta información de manera
            confidencial, y el acceso a ella está restringido a nuestros agentes
            o técnicos, quienes están obligados a usarla solo para brindar los
            servicios de UnityFull SRL. Protección y Uso de la Información
            Personal La información personal de nuestros clientes no será
            vendida ni compartida con terceros para actividades de mercadeo sin
            su consentimiento. La revelación de sus datos solo será permitida
            cuando: Sea requerido por la ley o por orden judicial. Se deba hacer
            cumplir los términos y condiciones de UnityFull SRL. Sea necesario
            para proteger los derechos, la propiedad o la seguridad de UnityFull
            SRL y el público en general. UnityFull SRL hace todos los esfuerzos
            para proteger su información personal, cumpliendo con el principio
            de inviolabilidad de las comunicaciones establecido por el artículo
            44 de la Constitución de la República Dominicana, y las
            disposiciones establecidas por INDOTEL para la obtención y
            preservación de datos e informaciones​(Informática Jurídica ). Es
            importante que el usuario mantenga la confidencialidad de su
            contraseña y cualquier información de cuenta. Los cambios en esta
            Política de Privacidad serán publicados en nuestro sitio para que
            esté siempre informado sobre la información que recolectamos y cómo
            la utilizamos.
          </p>
        </section>

        <section id="politica-anti-spam" className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">3. POLÍTICA ANTI SPAM</h3>
          <p>
            En UnityFull SRL, hemos establecido una política de cero tolerancia
            al spam, siguiendo las regulaciones locales e internacionales, como
            la Ley Federal CAN-SPAM. Si considera que ha recibido correos no
            deseados por parte de nuestros clientes, por favor contáctenos para
            resolver el problema. Medidas Anti-Spam Implementadas Consentimiento
            de envío: Solo se envían correos electrónicos comerciales a personas
            que han dado su consentimiento expreso. Esto se verifica mediante
            procesos de suscripción "opt-in" o "doble opt-in". Pruebas de
            consentimiento: UnityFull SRL puede requerir evidencia de que los
            destinatarios han otorgado su permiso para recibir comunicaciones.
            Claridad en los correos: En cada email se incluye información sobre
            cómo fue obtenido el contacto, con la posibilidad de darse de baja
            de manera sencilla. Respeto a solicitudes de baja: Las solicitudes
            de baja de suscripción serán procesadas en un plazo de 10 días desde
            su recepción. Rastreo de denuncias por abuso: Todos los envíos de
            correo están sujetos a un monitoreo constante y pueden ser
            rastreados en caso de denuncias por abuso.
          </p>
        </section>

        <section id="cumplimiento-con-leyes-indotel" className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">
            4. CUMPLIMIENTO CON LEYES DE INDOTEL
          </h3>
          <p>
            UnityFull SRL se adhiere a la Ley No. 53-07 sobre Crímenes y Delitos
            de Alta Tecnología y al Reglamento de obtención y preservación de
            datos e informaciones por parte de proveedores de servicios
            establecido por INDOTEL. La información electrónica, incluidos los
            correos electrónicos, se maneja con estricto cumplimiento de estas
            regulaciones, protegiendo los datos personales de los usuarios y
            manteniendo la privacidad y seguridad conforme a la Ley No. 172-13
            de Protección de Datos Personales​(SUPERBANCO).
          </p>
        </section>

        <section id="procedimiento-queja" className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">
            5. PROCEDIMIENTO DE QUEJA
          </h3>
          <p>
            Si ha recibido correos no deseados y desea presentar una queja, siga
            los siguientes pasos: Haga clic en el enlace de cancelación de
            suscripción incluido en el correo. Contacte a nuestro equipo de
            soporte para solicitar la eliminación de futuras comunicaciones. En
            caso de identificar cualquier conducta de spam por parte de nuestros
            clientes, por favor contáctenos en postmaster@unityfull.com. Si
            tienes alguna consulta sobre esta política de privacidad o sobre
            cómo manejamos los correos electrónicos, no dudes en comunicarte con
            nosotros.
          </p>
        </section>

        {/* Añade las secciones restantes de manera similar */}
      </main>
    </div>
  );
};

export default TermsAndConditions;
