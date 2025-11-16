import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Eye, 
  Archive, 
  X, 
  CheckCircle2,
  FolderArchive,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  date: string;
  color: string;
  content?: string;
}

const mockDocuments: Document[] = [
  {
    id: '1001',
    title: 'Bill of Lading #1001',
    type: 'Bill of Lading',
    size: '245 KB',
    date: 'Nov 15, 2025',
    color: 'blue',
    content: `BILL OF LADING #1001

Shipper: Fresh Harvest Ltd.
Address: 123 Agriculture St, Tbilisi, Georgia
Phone: +995 555 123 456

Consignee: Premium Foods Distribution
Address: 456 Market Square, Batumi, Georgia  
Phone: +995 555 789 012

Carrier: OnPoint Logistics
Driver: Dachi Ghambashidze
Truck: GE-TB-1234

SHIPMENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Item: Fresh Produce (Organic Vegetables)
Quantity: 500 boxes
Weight: 2,500 kg
Special Instructions: Temperature controlled transport required (2-4°C)

Route: Tbilisi → Batumi
Distance: 380 km
Pickup Date: Nov 15, 2025, 08:00
Delivery Date: Nov 15, 2025, 16:00

Payment: ₾850
Payment Terms: Net 30

SIGNATURES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Shipper: _________________ Date: _______
Carrier: _________________ Date: _______
Receiver: ________________ Date: _______

This document serves as proof of receipt and delivery.`
  },
  {
    id: '1002',
    title: 'Delivery Receipt #1001',
    type: 'Receipt',
    size: '128 KB',
    date: 'Nov 15, 2025',
    color: 'purple',
    content: `DELIVERY RECEIPT #1001

CONFIRMATION OF DELIVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Load ID: #1001
Driver: Dachi Ghambashidze
Truck: GE-TB-1234

DELIVERY DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
From: Fresh Harvest Ltd., Tbilisi
To: Premium Foods Distribution, Batumi
Distance Traveled: 380 km

Cargo: Fresh Produce (Organic Vegetables)
Quantity: 500 boxes
Weight: 2,500 kg

Pickup Time: Nov 15, 2025 at 08:00
Delivery Time: Nov 15, 2025 at 16:00
Transit Time: 8 hours

CONDITION ON DELIVERY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ All boxes accounted for
✓ No damage observed
✓ Temperature maintained (2-4°C)
✓ Seals intact

PAYMENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Amount: ₾850
Payment Method: Bank Transfer
Status: Completed

Received by: ________________
Date: Nov 15, 2025
Signature: _________________

Thank you for using OnPoint Logistics!`
  },
  {
    id: 'inv-1001',
    title: 'Invoice #INV-2024-1001',
    type: 'Invoice',
    size: '156 KB',
    date: 'Nov 15, 2025',
    color: 'green',
    content: `INVOICE #INV-2024-1001

OnPoint Logistics
123 Transport Avenue
Tbilisi, Georgia
Phone: +995 555 100 200
Email: billing@onpoint.ge

BILL TO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fresh Harvest Ltd.
123 Agriculture St
Tbilisi, Georgia
Tax ID: GE123456789

Invoice Date: Nov 15, 2025
Due Date: Dec 15, 2025
Payment Terms: Net 30

SERVICES PROVIDED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Description              Quantity    Rate      Amount
────────────────────────────────────────────────
Transportation Service        1    ₾850.00   ₾850.00
Tbilisi → Batumi
(380 km, Temperature 
Controlled)

Fuel Surcharge                1     ₾50.00    ₾50.00
Documentation Fee             1     ₾25.00    ₾25.00
                                          ──────────
                              Subtotal:      ₾925.00
                              VAT (18%):     ₾166.50
                                          ──────────
                              TOTAL DUE:   ₾1,091.50

PAYMENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bank: Georgian Commercial Bank
Account: GE12TB0123456789012345
SWIFT: BAGAGE22

Please reference Invoice #INV-2024-1001 with payment.

Thank you for your business!`
  }
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [archivedDocs, setArchivedDocs] = useState<Document[]>([]);
  const [activeTab, setActiveTab] = useState<'current' | 'archive'>('current');
  const [viewDoc, setViewDoc] = useState<Document | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isArchiving, setIsArchiving] = useState<string | null>(null);
  const [archiveSuccess, setArchiveSuccess] = useState<string | null>(null);

  const handleView = (doc: Document) => {
    setViewDoc(doc);
  };

  const handleDownload = async (doc: Document) => {
    setIsDownloading(doc.id);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a blob with the document content
    const content = doc.content || `Document: ${doc.title}\nType: ${doc.type}\nDate: ${doc.date}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsDownloading(null);
    setDownloadSuccess(doc.id);
    
    // Clear success message after 2 seconds
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  const handleArchive = async (doc: Document) => {
    setIsArchiving(doc.id);
    
    // Simulate archive delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Move document to archive
    setDocuments(prev => prev.filter(d => d.id !== doc.id));
    setArchivedDocs(prev => [...prev, doc]);
    
    setIsArchiving(null);
    setArchiveSuccess(doc.id);
    
    // Clear success message after 2 seconds
    setTimeout(() => setArchiveSuccess(null), 2000);
  };

  const handleUnarchive = async (doc: Document) => {
    setIsArchiving(doc.id);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Move document back to current
    setArchivedDocs(prev => prev.filter(d => d.id !== doc.id));
    setDocuments(prev => [...prev, doc]);
    
    setIsArchiving(null);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500'
    };
    return colors[color] || 'bg-blue-500';
  };

  const currentDocs = activeTab === 'current' ? documents : archivedDocs;

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your load documentation</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30">
          <Plus className="mr-2 h-4 w-4" />
          Generate Document
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className="flex gap-4 mb-6 border-b-2 border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          onClick={() => setActiveTab('current')}
          className={`pb-3 px-2 font-semibold transition-all duration-300 relative ${
            activeTab === 'current'
              ? 'text-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Current ({documents.length})
          {activeTab === 'current' && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          className={`pb-3 px-2 font-semibold transition-all duration-300 relative ${
            activeTab === 'archive'
              ? 'text-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Archive ({archivedDocs.length})
          {activeTab === 'archive' && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      </motion.div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {currentDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg border-2 border-gray-100 p-6 hover:shadow-lg hover:shadow-red-500/10 hover:border-red-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${getColorClasses(doc.color)} p-4 rounded-lg shadow-md`}>
                  <FileText className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{doc.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {/* View Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(doc)}
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>

                    {/* Download Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                      disabled={isDownloading === doc.id}
                      className="hover:bg-green-50 hover:text-green-600 hover:border-green-600 transition-all relative overflow-hidden"
                    >
                      {isDownloading === doc.id ? (
                        <>
                          <motion.div 
                            className="mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Download className="h-4 w-4" />
                          </motion.div>
                          Downloading...
                        </>
                      ) : downloadSuccess === doc.id ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                          <span className="text-green-600">Downloaded!</span>
                        </motion.div>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </>
                      )}
                    </Button>

                    {/* Archive/Unarchive Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => activeTab === 'current' ? handleArchive(doc) : handleUnarchive(doc)}
                      disabled={isArchiving === doc.id}
                      className="hover:bg-orange-50 hover:text-orange-600 hover:border-orange-600 transition-all"
                    >
                      {isArchiving === doc.id ? (
                        <>
                          <motion.div
                            className="mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <FolderArchive className="h-4 w-4" />
                          </motion.div>
                          {activeTab === 'current' ? 'Archiving...' : 'Unarchiving...'}
                        </>
                      ) : archiveSuccess === doc.id ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4 text-orange-600" />
                          <span className="text-orange-600">Archived!</span>
                        </motion.div>
                      ) : (
                        <>
                          <Archive className="mr-2 h-4 w-4" />
                          {activeTab === 'current' ? 'Archive' : 'Unarchive'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {currentDocs.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FolderArchive className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {activeTab === 'current' ? 'No Current Documents' : 'No Archived Documents'}
          </h3>
          <p className="text-gray-500">
            {activeTab === 'current' 
              ? 'Generate or upload documents to get started' 
              : 'Archived documents will appear here'}
          </p>
        </motion.div>
      )}

      {/* View Document Modal */}
      <Dialog open={!!viewDoc} onOpenChange={() => setViewDoc(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`${getColorClasses(viewDoc?.color || 'blue')} p-2 rounded`}>
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900">{viewDoc?.title}</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {viewDoc?.type} • {viewDoc?.size} • {viewDoc?.date}
            </DialogDescription>
          </DialogHeader>

          {/* Document Content */}
          <div className="mt-4">
            <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap border-2 border-gray-200">
              {viewDoc?.content || 'No content available for this document.'}
            </div>

            {/* Actions in Modal */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => viewDoc && handleDownload(viewDoc)}
                disabled={isDownloading === viewDoc?.id}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
              >
                {isDownloading === viewDoc?.id ? (
                  <>
                    <motion.div
                      className="mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Download className="h-4 w-4" />
                    </motion.div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewDoc(null)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
