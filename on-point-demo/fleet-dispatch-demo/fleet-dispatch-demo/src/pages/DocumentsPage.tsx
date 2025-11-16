import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useDocumentsStore } from '../stores/documentsStore';
import {
  FileTextIcon,
  DownloadIcon,
  PlusIcon,
  LoaderIcon,
  FileIcon,
  CheckCircle2Icon,
} from 'lucide-react';
import { Document } from '../data/mockData';

const documentTypeLabels = {
  bol: 'Bill of Lading',
  invoice: 'Invoice',
  receipt: 'Receipt',
  permit: 'Permit',
  insurance: 'Insurance',
};

const documentTypeColors = {
  bol: 'bg-blue-500',
  invoice: 'bg-green-500',
  receipt: 'bg-purple-500',
  permit: 'bg-yellow-500',
  insurance: 'bg-red-500',
};

export default function DocumentsPage() {
  const { documents, isGenerating, generationProgress, generateDocument } = useDocumentsStore();
  const [activeTab, setActiveTab] = useState<'current' | 'archive'>('current');

  const currentDocs = documents.slice(0, 3);
  const archivedDocs = documents.slice(3);

  const handleGenerateDocument = async () => {
    await generateDocument('load_1001', 'bol');
  };

  const renderDocument = (doc: Document) => (
    <Card
      key={doc.id}
      className="p-6 hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/50"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${documentTypeColors[doc.type]} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <FileTextIcon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {doc.name}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span>{documentTypeLabels[doc.type]}</span>
            <span>•</span>
            <span>{doc.size}</span>
            <span>•</span>
            <span>
              {new Date(doc.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <FileIcon className="w-4 h-4" />
              View
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <DownloadIcon className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground mt-1">
              Manage your load documentation
            </p>
          </div>

          <Button
            onClick={handleGenerateDocument}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {isGenerating ? (
              <>
                <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4 mr-2" />
                Generate Document
              </>
            )}
          </Button>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <Card className="p-4 bg-blue-50 border-blue-200 animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <LoaderIcon className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm font-medium text-blue-900">
                AI generating document...
              </span>
            </div>
            <Progress value={generationProgress} className="h-2" />
            <p className="text-xs text-blue-700 mt-2">
              Analyzing load data and creating Bill of Lading
            </p>
          </Card>
        )}

        {generationProgress === 100 && !isGenerating && (
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2Icon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">
                Document generated successfully!
              </span>
            </div>
          </Card>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="current">
            Current ({currentDocs.length})
          </TabsTrigger>
          <TabsTrigger value="archive">
            Archive ({archivedDocs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentDocs.map(renderDocument)}
          </div>
          {currentDocs.length === 0 && (
            <Card className="p-12 text-center">
              <FileTextIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No current documents
              </h3>
              <p className="text-muted-foreground mb-4">
                Generate documents for your active loads
              </p>
              <Button onClick={handleGenerateDocument} variant="outline">
                <PlusIcon className="w-4 h-4 mr-2" />
                Generate Document
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="archive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {archivedDocs.map(renderDocument)}
          </div>
          {archivedDocs.length === 0 && (
            <Card className="p-12 text-center">
              <FileTextIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No archived documents
              </h3>
              <p className="text-muted-foreground">
                Completed load documents will appear here
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
