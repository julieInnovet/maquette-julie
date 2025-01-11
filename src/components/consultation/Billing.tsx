import React, { useState } from 'react';
import { Plus, DollarSign, FileText, Send, Printer, Download } from 'lucide-react';

interface BillingProps {
  consultation: any;
}

export function Billing({ consultation }: BillingProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Mock data for demonstration
  const billingItems = [
    {
      id: '1',
      code: 'CS',
      description: 'Consultation standard',
      price: 50.00
    },
    {
      id: '2',
      code: 'RAD',
      description: 'Radiographie',
      price: 75.00
    },
    {
      id: '3',
      code: 'INJ',
      description: 'Injection sous-cutanée',
      price: 15.00
    }
  ];

  const total = billingItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Facturation</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-navy-50 text-navy-600 rounded-lg hover:bg-navy-100">
            <FileText size={20} />
            Modèles
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
            <Plus size={20} />
            Ajouter un acte
          </button>
        </div>
      </div>

      {/* Billing Items */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {billingItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {item.price.toFixed(2)} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...selectedItems, item.id]);
                      } else {
                        setSelectedItems(selectedItems.filter(id => id !== item.id));
                      }
                    }}
                    className="rounded border-gray-300 text-turquoise-600 focus:ring-turquoise-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                Total
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                {total.toFixed(2)} €
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-4">Mode de règlement</h4>
        <div className="grid grid-cols-4 gap-4">
          {['CB', 'Espèces', 'Chèque', 'Virement'].map((method) => (
            <button
              key={method}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-turquoise-500 hover:bg-turquoise-50"
            >
              <DollarSign size={20} />
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
            <Download size={20} />
            Télécharger
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
            <Printer size={20} />
            Imprimer
          </button>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
          <Send size={20} />
          Finaliser la facture
        </button>
      </div>
    </div>
  );
}