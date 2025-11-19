# Authentication Routes & Features

## 📋 Routes d'Authentification Complètes

### 1. **Registration & Login**
- ✅ `POST /api/auth/register` - Inscription utilisateur
- ✅ `POST /api/auth/login` - Connexion email/password
- ✅ `POST /api/auth/logout` - Déconnexion
- ✅ `GET /api/auth/session` - Récupérer la session actuelle

### 2. **OAuth Providers** (via NextAuth.js)
- ✅ `GET/POST /api/auth/[...nextauth]` - Handlers NextAuth
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Facebook OAuth (optionnel)
- ✅ Twitter OAuth (optionnel)

### 3. **Password Management**
- ✅ `POST /api/auth/forgot-password` - Demande de réinitialisation
- ✅ `POST /api/auth/reset-password` - Réinitialiser avec token
- ✅ `POST /api/auth/change-password` - Changer mot de passe (connecté)
- ✅ `POST /api/auth/verify-password` - Vérifier mot de passe actuel

### 4. **Email Verification**
- ✅ `POST /api/auth/send-verification` - Envoyer email de vérification
- ✅ `GET /api/auth/verify-email` - Vérifier email avec token
- ✅ `POST /api/auth/resend-verification` - Renvoyer email

### 5. **User Profile**
- ✅ `GET /api/auth/me` - Profil utilisateur connecté
- ✅ `PUT /api/auth/me` - Mettre à jour profil
- ✅ `DELETE /api/auth/me` - Supprimer compte
- ✅ `GET /api/auth/me/orders` - Commandes de l'utilisateur
- ✅ `GET /api/auth/me/addresses` - Adresses de livraison

### 6. **Token Management**
- ✅ `POST /api/auth/refresh` - Refresh access token
- ✅ `POST /api/auth/revoke` - Révoquer tous les tokens

### 7. **Two-Factor Authentication (2FA)** - Optionnel
- ✅ `POST /api/auth/2fa/enable` - Activer 2FA
- ✅ `POST /api/auth/2fa/disable` - Désactiver 2FA
- ✅ `POST /api/auth/2fa/verify` - Vérifier code 2FA

### 8. **Social Connections**
- ✅ `GET /api/auth/accounts` - Liste des comptes liés
- ✅ `POST /api/auth/accounts/link` - Lier un compte social
- ✅ `DELETE /api/auth/accounts/unlink` - Délier un compte

### 9. **Admin Routes**
- ✅ `GET /api/admin/users` - Liste utilisateurs (admin)
- ✅ `PATCH /api/admin/users/[id]/role` - Modifier rôle
- ✅ `DELETE /api/admin/users/[id]` - Supprimer utilisateur

## 🔐 Features de Sécurité

### Password Requirements
- Minimum 8 caractères
- Au moins 1 majuscule
- Au moins 1 minuscule
- Au moins 1 chiffre
- Au moins 1 caractère spécial

### Rate Limiting
- Login: 5 tentatives / 15 minutes
- Password reset: 3 demandes / heure
- Registration: 3 comptes / IP / jour

### Session Management
- JWT tokens avec expiration
- Refresh tokens (7 jours)
- Access tokens (15 minutes)
- Secure httpOnly cookies

### Email Verification
- Token expire après 24h
- Email requis pour OAuth
- Resend limit: 3 fois / heure

## 📊 User Data Model

```typescript
interface User {
  id: string
  email: string
  emailVerified: boolean
  name: string
  avatar?: string
  role: 'user' | 'admin' | 'moderator'
  provider: 'email' | 'google' | 'github' | 'facebook'
  providerId?: string
  passwordHash?: string // Only for email provider
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

interface Session {
  id: string
  userId: string
  accessToken: string
  refreshToken: string
  expiresAt: string
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

interface PasswordResetToken {
  id: string
  userId: string
  token: string
  expiresAt: string
  createdAt: string
}

interface EmailVerificationToken {
  id: string
  userId: string
  token: string
  expiresAt: string
  createdAt: string
}
```

## 🛠️ Technologies Utilisées

- **NextAuth.js** - OAuth & session management
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT tokens
- **nodemailer** - Email sending
- **speakeasy** - 2FA/TOTP generation
- **rate-limiter-flexible** - Rate limiting

## 📧 Email Templates

1. **Welcome Email** - Après inscription
2. **Email Verification** - Confirmer email
3. **Password Reset** - Lien de réinitialisation
4. **Password Changed** - Notification changement
5. **Login Alert** - Nouvelle connexion détectée
6. **2FA Code** - Code de vérification

## 🔄 Authentication Flow

### Registration Flow
1. User submits email + password
2. Validate data & check if email exists
3. Hash password with bcrypt
4. Create user in database
5. Generate email verification token
6. Send verification email
7. Return success (user not logged in yet)

### Login Flow
1. User submits email + password
2. Find user by email
3. Verify password hash
4. Check if email is verified
5. Check if 2FA is enabled
6. Generate access & refresh tokens
7. Create session
8. Return tokens + user data

### OAuth Flow
1. User clicks OAuth provider
2. Redirect to provider
3. Provider returns with code
4. Exchange code for user info
5. Check if user exists
6. Create or update user
7. Generate tokens
8. Create session
9. Redirect to dashboard

### Password Reset Flow
1. User requests reset
2. Generate reset token (24h expiry)
3. Send email with reset link
4. User clicks link
5. Verify token validity
6. User enters new password
7. Hash and update password
8. Invalidate reset token
9. Send confirmation email

## 🚀 Next Steps

1. Implement core auth routes
2. Setup NextAuth configuration
3. Add email service integration
4. Implement rate limiting
5. Add 2FA support
6. Create admin panel
7. Add audit logs
8. Setup monitoring
