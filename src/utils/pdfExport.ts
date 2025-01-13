import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatPrice } from '@/utils/formatters';

// Extend the jsPDF type to include the lastAutoTable property
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

export const exportPropertyComparison = (properties: any[]) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Property Comparison Report', 14, 22);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);

  // Prepare data for the comparison table
  const tableData = properties.map(property => [
    property.title,
    formatPrice(property.price),
    property.location,
    property.property_type,
    `${property.square_feet} sq ft`,
    property.property_analytics?.[0]?.roi ? `${property.property_analytics[0].roi}%` : 'N/A',
    property.property_analytics?.[0]?.risk_score ? `${property.property_analytics[0].risk_score}/10` : 'N/A'
  ]);

  // Add the comparison table
  autoTable(doc, {
    head: [['Property', 'Price', 'Location', 'Type', 'Size', 'ROI', 'Risk Score']],
    body: tableData,
    startY: 40,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  // For each property, add detailed analytics
  let yPos = doc.lastAutoTable.finalY + 20;
  
  properties.forEach((property, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.text(`${property.title} - Detailed Analysis`, 14, yPos);
    
    const analytics = property.property_analytics?.[0];
    const marketData = property.property_market_data?.[0];
    
    const detailsData = [
      ['AI Confidence Score', `${analytics?.ai_confidence_score || 'N/A'}%`],
      ['Predicted Growth', `${analytics?.predicted_growth || 'N/A'}%`],
      ['Market Trend', analytics?.market_trend || 'N/A'],
      ['Market Value', formatPrice(marketData?.market_value || 0)],
      ['Price per sq ft', `$${marketData?.price_per_sqft || 'N/A'}`],
      ['Market Demand', `${marketData?.market_demand_score || 'N/A'}/100`],
    ];

    autoTable(doc, {
      body: detailsData,
      startY: yPos + 10,
      theme: 'plain',
      styles: { fontSize: 8 },
    });

    yPos = doc.lastAutoTable.finalY + 20;
  });

  // Save the PDF
  doc.save('property-comparison-report.pdf');
};