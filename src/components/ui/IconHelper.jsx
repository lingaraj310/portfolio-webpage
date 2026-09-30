import React from 'react';
import {
  User,
  Cpu,
  Users,
  Code2,
  Sparkles,
  GraduationCap,
  Radio,
  FileText,
  Trophy,
  MapPin,
  Compass,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
  VolumeX,
  Terminal,
  Activity,
  Layers,
  Send,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  BookOpen,
  Award
} from 'lucide-react';

const icons = {
  User,
  Cpu,
  Users,
  Code2,
  Sparkles,
  GraduationCap,
  Radio,
  FileText,
  Trophy,
  MapPin,
  Compass,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
  VolumeX,
  Terminal,
  Activity,
  Layers,
  Send,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  BookOpen,
  Award
};

export default function IconHelper({ name, className = "w-5 h-5", ...props }) {
  const IconComponent = icons[name] || MapPin;
  return <IconComponent className={className} {...props} />;
}
