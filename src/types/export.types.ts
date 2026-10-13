import { ExportFormat } from './project.types';

export interface ExportPayload {
  filename: string;
  format: ExportFormat;
  content: string;
  mimeType: string;
}
