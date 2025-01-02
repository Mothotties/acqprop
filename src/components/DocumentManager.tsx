import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload, Trash2, Download } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: "lease" | "insurance" | "tax" | "maintenance" | "other";
}

export function DocumentManager() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Lease Agreement.pdf",
      type: "PDF",
      size: "2.5 MB",
      uploadDate: "2024-03-15",
      category: "lease",
    },
    {
      id: "2",
      name: "Insurance Policy.pdf",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-03-14",
      category: "insurance",
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.split("/")[1].toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toISOString().split("T")[0],
        category: "other",
      };

      setDocuments([...documents, newDoc]);
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been successfully uploaded.`,
      });
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast({
      title: "Document Deleted",
      description: "The document has been removed.",
    });
  };

  const handleDownload = (doc: Document) => {
    toast({
      title: "Download Started",
      description: `Downloading ${doc.name}...`,
    });
    // In a real application, this would trigger an actual file download
    console.log("Downloading:", doc.name);
  };

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Document Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <Button asChild className="w-full">
              <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </label>
            </Button>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {doc.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}