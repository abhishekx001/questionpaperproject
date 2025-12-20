'use client';

import React from 'react';

export default function TestPdfPage() {
    const generatePDF = async () => {
        // Dynamic import to ensure client-side execution
        const html2pdf = (await import('html2pdf.js')).default;

        const element = document.getElementById('qp');
        const opt = {
            margin: 1,
            filename: 'test.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 4,
                letterRendering: true,
                useCORS: true
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        html2pdf().from(element).set(opt).save();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-100 p-10">
            {/* The content to capture */}
            <div id="qp" className="bg-white p-10 shadow-lg border border-gray-300">
                <h1 className="text-4xl font-bold mb-4 text-black">Hello World</h1>
                <p className="text-xl text-black">This is a test PDF generation.</p>
            </div>

            <button
                onClick={generatePDF}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
                Download PDF
            </button>
        </div>
    );
}
