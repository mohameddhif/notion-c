
import { PackageSearch } from 'lucide-react';
import { PencilRuler } from 'lucide-react';
import { Computer } from 'lucide-react';
import { Crop } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { Home, Folder, Calendar, Settings, Users, FileText, ChevronLeft, CheckCheck  } from 'lucide-react';

import { Factory } from 'lucide-react';

import user1 from "../assets/profile-pictures/user1.jpg";

export const navItems = [
  { label: "Fonctionnalités", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Tarifs", href: "#" },
  { label: "FAQ", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
];

export const features = [
  {
    icon: <PackageSearch />,
    text: "Produit",
    description:
      "Votre hub centralisé pour gérer le cycle de vie des produits. Collaborez sur les roadmaps, suivez les backlogs et alignez les équipes sur une vision commune.",
  },
  {
    icon: <PencilRuler />,
    text: "Ingénierie",
    description:
      "Espace sécurisé pour la documentation technique, le suivi des bugs et la gestion des sprints. Optimisé pour les workflows de développement agile.",
  },
  {
    icon: <Crop />,
    text: "Design",
    description:
      "Plateforme collaborative pour les maquettes, les systèmes de design et les tests utilisateur. Gardez toute la création visuelle synchronisée.",
  },
  {
    icon: <Computer />,
    text: "Informatique",
    description:
      "Centre de contrôle pour l'infrastructure IT. Documentez les systèmes, planifiez les mises à jour et gérez les incidents en temps réel.",
  },
  {
    icon: <TrendingUp />,
    text: "Marketing",
    description:
      "Espace dynamique pour les campagnes, le content planning et l'analyse ROI. Connectez vos canaux et mesurez l'impact en continu.",
  },
  {
    icon: <Factory />,
    text: "Start-up",
    description:
      "Environnement tout-en-un pour les jeunes pousses. Centralisez votre pitch deck, suivez les KPIs et coordonnez les fondateurs.",
  },
];

export const checklistItems = [
  {
    title: "Des notes parfaites, à chaque fois.",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Une seule recherche pour tout.",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "La boîte de réception qui vous ressemble.",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Gérez l’intégralité de votre entreprise.",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Gratuit",
    price: "0 DT",
    features: [
      "Gratuit pour un usage individuel",
      "Formulaires de base",
      "Sites de base",
      "Notion Mail (synchronisation avec Gmail)",
    ],
  },
  {
    title: "Pro",
    price: "20 DT",
    features: [
      "Utilisation illimitée des blocs collaboratifs",
      "Chargement de fichiers illimité",
      "Graphiques illimités",
      "Sites personnalisés",
    ],
  },
  {
    title: "Enterprise",
    price: "150 DT",
    features: [
      "SSO SAML",
      "Vérifier n’importe quelle page",
      "Vérification de domaine",
      "Approvisionnement des utilisateurs (SCIM)",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Centre d'aide" },
  { href: "#", text: "Tarifs" },
  { href: "#", text: "Blog" },
  { href: "#", text: "Affiliés" },
  { href: "#", text: "Intégration" },
];

export const platformLinks = [
  { href: "#", text: "A propos" },
  { href: "#", text: "Carrières" },
  { href: "#", text: "Sécurité" },
  { href: "#", text: "Conditions d'utilisation" },
  { href: "#", text: "Confidentialité" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];

export const faqs = [
  {
    question: "Quels sont les services de messagerie compatibles avec Notion Mail ?",
    answer: "Notion Mail s’intègre à Google et aux comptes Gmail."
  },
  {
    question: "Quand l’outil Notion Mail sera-t-il disponible sur les appareils mobiles ?",
    answer: "L’application iOS arrive bientôt ! Notion Mail sera également disponible sur Android en 2025."
  },
];

export const menuItems = [
  { name: 'Tableau de Bord', path: 'dashboard', icon: <Home size={18} /> },
  { name: 'Calendrier', path: 'calendrier', icon: <Calendar size={18} /> },
  { name: 'Projets', path: 'projets', icon: <Folder size={18} /> },
  { name: 'Tâches', path: 'taches', icon: <CheckCheck size={20} /> },
  { name: 'Paramètres', path: 'parametres', icon: <Settings size={20} /> },
  { name: 'Equipe', path: 'equipe', icon: <Users size={20} /> },
];

export const sampleProjects = [
  {
    projectName: "Refonte du Site Web",
    columns: {
      todo: {
        name: 'À faire',
        items: [
          {
            id: 1,
            title: 'Créer l’UI',
            description: 'Design de la maquette',
            date: '2025-07-01',
            assignedTo: 'Mohamed',
          },
          {
            id: 2,
            title: 'Configurer le backend',
            description: 'Connexion à la base de données',
            date: '2025-07-02',
            assignedTo: 'Noura',
          },
        ],
      },
      inProgress: {
        name: 'En cours',
        items: [
          {
            id: 3,
            title: 'API utilisateurs',
            description: 'Création et authentification',
            date: '2025-07-03',
            assignedTo: 'Sami',
          },
        ],
      },
      done: {
        name: 'Terminé',
        items: [
          {
            id: 4,
            title: 'Déploiement',
            description: 'Déployé sur Vercel',
            date: '2025-07-04',
            assignedTo: 'Amine',
          },
        ],
      },
    },
    status: "En cours",
    category: "Modèle Corporatif",
    completedTasks: 7,
    totalTasks: 20,
    startDate: "1 mars 2024",
    endDate: "31 mars 2024",
  },
  {
    projectName: "Application Mobile",
    columns: {
      todo: {
        name: 'À faire',
        items: [
          {
            id: 5,
            title: 'Wireframe initial',
            description: 'Esquisse des écrans principaux',
            date: '2025-07-05',
            assignedTo: 'Karim',
          },
        ],
      },
      inProgress: {
        name: 'En cours',
        items: [],
      },
      done: {
        name: 'Terminé',
        items: [],
      },
    },
    status: "En attente",
    category: "Kit UI Moderne",
    completedTasks: 3,
    totalTasks: 15,
    startDate: "15 février 2024",
    endDate: "30 avril 2024",
  },
  {
    projectName: "Intégration API",
    columns: {
      todo: {
        name: 'À faire',
        items: [],
      },
      inProgress: {
        name: 'En cours',
        items: [],
      },
      done: {
        name: 'Terminé',
        items: [
          {
            id: 6,
            title: 'Connexion API météo',
            description: 'Connexion à l’API externe',
            date: '2025-07-06',
            assignedTo: 'Leila',
          },
          {
            id: 7,
            title: 'Tests finaux',
            description: 'Tests unitaires et d’intégration',
            date: '2025-07-07',
            assignedTo: 'Ali',
          },
        ],
      },
    },
    status: "Terminé",
    category: "Modèle Technique",
    completedTasks: 12,
    totalTasks: 12,
    startDate: "10 janvier 2024",
    endDate: "5 février 2024",
  }
];
