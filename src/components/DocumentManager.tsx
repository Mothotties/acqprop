import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload, Trash2, Download } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: "lease" | "insurance" | "tax" | "maintenance" | "other";
  filePath?: string;
}

export function DocumentManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['property-documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(doc => ({
        id: doc.id,
        name: doc.name,
        type: doc.document_type,
        size: "Calculating...", // We'll update this when we implement file storage
        uploadDate: new Date(doc.created_at).toISOString().split('T')[0],
        category: doc.document_type.toLowerCase() as Document['category'],
        filePath: doc.file_path
      }));
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // Upload to Supabase Storage
      const filePath = `${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('property-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: dbError } = await supabase
        .from('property_documents')
        .insert({
          name: file.name,
          document_type: file.type.split('/')[1].toUpperCase(),
          file_path: filePath,
          status: 'active'
        });

      if (dbError) throw dbError;

      return filePath;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-documents'] });
      toast({
        title: "Document Uploaded",
        description: "The document has been successfully uploaded.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (document: Document) => {
      if (document.filePath) {
        const { error: storageError } = await supabase.storage
          .from('property-documents')
          .remove([document.filePath]);

        if (storageError) throw storageError;
      }

      const { error: dbError } = await supabase
        .from('property_documents')
        .delete()
        .eq('id', document.id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-documents'] });
      toast({
        title: "Document Deleted",
        description: "The document has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Deletion Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  const handleDownload = async (doc: Document) => {
    if (!doc.filePath) {
      toast({
        title: "Download Failed",
        description: "File path not found",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from('property-documents')
        .download(doc.filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: `Downloading ${doc.name}...`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <div className="h-7 bg-muted rounded w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

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
                    onClick={() => deleteMutation.mutate(doc)}
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