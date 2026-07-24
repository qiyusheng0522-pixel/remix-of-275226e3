import {
  Home, ClipboardList, MessageCircle, User, Users, Stethoscope, Building2,
  Hospital, GraduationCap, Calendar, CalendarDays, CheckCircle2, CheckSquare,
  Check, X, Bell, Search, FileText, BarChart3, TrendingUp, Lightbulb, Sparkles,
  AlertTriangle, AlertCircle, Ban, Lock, Unlock, Link as LinkIcon, Paperclip,
  Ruler, Scale, Repeat, RefreshCw, Mic, Headphones, Package, Send, Mail, Phone,
  Radio, Megaphone, PhoneOff, BookOpen, Book, Clipboard, Pin, Zap, Coffee,
  Sun, Moon, Cloud, Bed, Utensils, Salad, Apple, Carrot, ShoppingCart, PawPrint,
  Baby, User2, UserCircle, Wind, Activity, HeartPulse, Heart, Eye, Ear,
  Bone, Brain, Pill, TestTube, FlaskConical, ShieldCheck, ShieldAlert, HelpCircle,
  Monitor, Image as ImageIcon, FolderOpen, Clock, Circle, ArrowRight, Plus,
  ThumbsUp, Hand, Waves, Sprout, Flower2, PartyPopper, Ambulance, Siren,
  Droplets, Bike, PersonStanding, Dumbbell, Music, MapPin, Truck, Wrench,
  Bandage, Thermometer, Syringe, Microscope, ScanEye, Glasses, Shirt, Layers,
  MessageSquare, PenLine, FilePenLine, Info, Star, ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  "🏠": Home, "📋": ClipboardList, "💬": MessageCircle, "👤": User, "👥": Users,
  "🩺": Stethoscope, "🏫": GraduationCap, "🏥": Hospital, "🏢": Building2,
  "🎓": GraduationCap, "👨‍🎓": GraduationCap, "👨‍🏫": User2, "👨‍👩‍👧": Users,
  "👨‍⚕️": Stethoscope, "👩‍⚕️": Stethoscope, "⚕": Stethoscope, "⚕️": Stethoscope,
  "📅": Calendar, "🗓": CalendarDays, "🗓️": CalendarDays, "🕐": Clock, "🕒": Clock, "🕘": Clock,
  "✅": CheckCircle2, "✓": Check, "✕": X, "❌": X, "❓": HelpCircle,
  "🔔": Bell, "🔍": Search, "📄": FileText, "📝": PenLine, "📜": FileText,
  "📊": BarChart3, "📈": TrendingUp, "💡": Lightbulb, "✨": Sparkles, "⚡": Zap,
  "⚠": AlertTriangle, "⚠️": AlertTriangle, "🚨": Siren, "🚫": Ban, "📵": PhoneOff,
  "🔒": Lock, "🔐": Lock, "🔗": LinkIcon, "📎": Paperclip, "📏": Ruler, "⚖": Scale, "⚖️": Scale,
  "🔁": Repeat, "🔄": RefreshCw, "🎤": Mic, "🎧": Headphones, "📦": Package,
  "📩": Send, "📬": Mail, "📞": Phone, "📡": Radio, "📻": Radio, "📢": Megaphone, "📣": Megaphone,
  "📚": BookOpen, "📘": Book, "📌": Pin, "☕": Coffee, "☀": Sun, "☀️": Sun,
  "🌙": Moon, "🌤️": Cloud, "🌬️": Wind, "🛏": Bed, "🛏️": Bed,
  "🍚": Utensils, "🍱": Utensils, "🥗": Salad, "🥦": Apple, "🥕": Carrot,
  "🛒": ShoppingCart, "🐥": PawPrint, "👶": Baby, "👦": User2, "👧": User2, "🧒": User2,
  "👨": User, "👩": User, "🌸": Flower2, "🌿": Sprout, "🌱": Sprout,
  "🏃": PersonStanding, "🤸": PersonStanding, "⚽": Dumbbell, "👀": Eye, "👁": Eye, "👁️": Eye,
  "👓": Glasses, "👕": Shirt, "🦷": Bone, "🫁": Wind, "🧠": Brain,
  "💓": HeartPulse, "💗": Heart, "💕": Heart, "♥": Heart, "💫": Sparkles,
  "💧": Droplets, "🚱": Droplets, "🤖": ScanEye, "🤔": HelpCircle, "🤧": Wind,
  "🎉": PartyPopper, "🚑": Ambulance, "🧪": TestTube, "🧺": FolderOpen,
  "🪟": Layers, "🕳": Circle, "🖥️": Monitor, "🖼": ImageIcon, "🗂️": FolderOpen,
  "🟡": Circle, "😴": Moon, "👋": Hand, "👍": ThumbsUp, "🌊": Waves,
  "➕": Plus, "➤": ChevronRight, "➔": ArrowRight, "★": Star, "ℹ": Info, "ℹ️": Info,
};

export function EIcon({ e, className = "h-4 w-4" }: { e: string; className?: string }) {
  const C = MAP[e] ?? HelpCircle;
  return <C className={className} strokeWidth={2} />;
}

export function hasEIcon(e: string) {
  return e in MAP;
}
