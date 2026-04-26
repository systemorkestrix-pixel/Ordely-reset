import { createClient } from '@supabase/supabase-js';
import {
  BASE_SITE_SETTINGS,
  getPlatformHref,
  normalizeSiteSettings,
} from './site-settings.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const ALL_CATEGORY_KEY = '__all__';
const DEFAULT_SITE_SETTINGS = { ...BASE_SITE_SETTINGS };

const SOCIAL_PLATFORMS = [
  { key: 'facebook_url', label: '\u0641\u064A\u0633\u0628\u0648\u0643', className: 'facebook', icon: 'facebook' },
  { key: 'instagram_url', label: '\u0625\u0646\u0633\u062A\u063A\u0631\u0627\u0645', className: 'instagram', icon: 'instagram' },
  { key: 'tiktok_url', label: '\u062A\u064A\u0643 \u062A\u0648\u0643', className: 'tiktok', icon: 'tiktok' },
];

const ACTION_PLATFORMS = [
  { key: 'phone_number', label: '\u0627\u062A\u0635\u0627\u0644', className: 'btn-call', icon: 'phone' },
  { key: 'whatsapp_url', label: '\u0648\u0627\u062A\u0633\u0627\u0628', className: 'btn-whatsapp', icon: 'whatsapp' },
  { key: 'telegram_url', label: '\u062A\u0644\u062C\u0631\u0627\u0645', className: 'btn-telegram', icon: 'telegram' },
  { key: 'google_maps_url', label: '\u0627\u0644\u0645\u0648\u0642\u0639', className: 'btn-map', icon: 'map' },
];

let categories = [];
let products = [];
let activeCategory = null;
let siteSettings = { ...DEFAULT_SITE_SETTINGS };

const heroSection = document.getElementById('heroSection');
const categoryBar = document.querySelector('.category-bar');
const categoryContainer = document.getElementById('categoryContainer');
const productsContainer = document.getElementById('productsContainer');
const socialLinksContainer = document.getElementById('socialLinks');
const stickyBottomBar = document.getElementById('stickyBottomBar');

function getPlatformIcon(iconName) {
  switch (iconName) {
    case 'facebook':
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.6 1.7-1.6H16.7V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.5v7h3z" fill="currentColor"/>
        </svg>
      `;
    case 'instagram':
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
        </svg>
      `;
    case 'tiktok':
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.2 4c.5 1.7 1.8 3 3.5 3.5v2.8c-1.3 0-2.5-.4-3.5-1v5.2a4.5 4.5 0 1 1-4.5-4.5c.3 0 .7 0 1 .1v2.9a2 2 0 1 0 1 1.7V4h2.5z" fill="currentColor"/>
        </svg>
      `;
    case 'telegram':
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.7 4.5 3.8 11c-.8.3-.8 1.4.1 1.6l4.3 1.3 1.6 4.8c.2.7 1.1.9 1.6.3l2.4-2.9 4.8 3.5c.7.5 1.7.1 1.9-.8l2.6-12.4c.2-1-.8-1.8-1.7-1.4ZM9.3 13.4l8-5.1-6.3 6.8-.3 2.8-1.4-4.5Z" fill="currentColor"/>
        </svg>
      `;
    case 'whatsapp':
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.5-1.2A8.5 8.5 0 1 0 12 3.5Zm0 14.8c-1.2 0-2.3-.3-3.3-.9l-.2-.1-2.7.7.7-2.6-.2-.2A6.8 6.8 0 1 1 12 18.3Zm3.8-5.1c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1l-.4.6c-.1.2-.3.2-.5.1-.7-.3-2.1-1.3-2.5-2.2-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.5l-.6-1.3c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.4.1-.5.3-.2.3-.6.8-.6 1.8s.7 2.1.8 2.2c.1.1 1.4 2.2 3.5 3 .5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.1-.4 1.3-.9.2-.5.2-1 .1-1.1-.1-.1-.3-.1-.5-.2Z" fill="currentColor"/>
        </svg>
      `;
    case 'phone':
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.7 4.8c.4-.4 1-.6 1.6-.4l2.2.7c.7.2 1.1.9 1 1.6l-.2 2.1c0 .4.1.8.4 1.1l2.3 2.3c.3.3.7.5 1.1.4l2.1-.2c.7-.1 1.4.3 1.6 1l.7 2.2c.2.6 0 1.2-.4 1.6l-1 1c-.7.7-1.8 1-2.8.8-2.2-.5-4.4-1.7-6.3-3.7-1.9-1.9-3.2-4.1-3.7-6.3-.2-1 .1-2.1.8-2.8l1-1Z" fill="currentColor"/>
        </svg>
      `;
    case 'map':
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Zm0-8.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" fill="currentColor"/>
        </svg>
      `;
    default:
      return '';
  }
}

function isMissingOrderIndexError(error) {
  const message = String(error?.message || error?.details || '').toLowerCase();
  return message.includes('order_index') && message.includes('column');
}

function isMissingSiteSettingsError(error) {
  const message = String(error?.message || error?.details || '').toLowerCase();
  return message.includes('site_settings') && (
    message.includes('schema cache')
    || message.includes('does not exist')
    || message.includes('relation')
  );
}

function applyHeroSettings() {
  heroSection.style.backgroundImage = siteSettings.hero_image_url
    ? `url("${siteSettings.hero_image_url}")`
    : 'none';
}

function renderSocialLinks() {
  const visiblePlatforms = SOCIAL_PLATFORMS
    .map((platform) => ({
      ...platform,
      href: getPlatformHref(platform.key, siteSettings[platform.key]),
    }))
    .filter((platform) => platform.href);

  if (visiblePlatforms.length === 0) {
    socialLinksContainer.hidden = true;
    socialLinksContainer.innerHTML = '';
    return;
  }

  socialLinksContainer.hidden = false;
  socialLinksContainer.innerHTML = visiblePlatforms.map((platform) => `
    <a
      href="${platform.href}"
      class="social-link social-link-${platform.className}"
      target="_blank"
      rel="noopener"
      aria-label="${platform.label}"
      title="${platform.label}"
    >
      <span class="platform-icon" aria-hidden="true">${getPlatformIcon(platform.icon)}</span>
    </a>
  `).join('');
}

function renderActionButtons() {
  const actions = ACTION_PLATFORMS
    .map((platform) => {
      const href = getPlatformHref(platform.key, siteSettings[platform.key]);
      if (!href) {
        return null;
      }

      return {
        href,
        label: platform.label,
        className: platform.className,
        icon: platform.icon,
        external: platform.key !== 'phone_number',
      };
    })
    .filter(Boolean);

  document.body.classList.toggle('has-sticky-actions', actions.length > 0);

  if (actions.length === 0) {
    stickyBottomBar.hidden = true;
    stickyBottomBar.innerHTML = '';
    return;
  }

  stickyBottomBar.hidden = false;
  stickyBottomBar.innerHTML = actions.map((action) => `
    <a
      href="${action.href}"
      class="btn ${action.className}"
      ${action.external ? 'target="_blank" rel="noopener"' : ''}
      aria-label="${action.label}"
      title="${action.label}"
    >
      <span class="platform-icon" aria-hidden="true">${getPlatformIcon(action.icon)}</span>
    </a>
  `).join('');
}

function renderCategories() {
  categoryContainer.innerHTML = '';

  if (!categories.length) {
    categoryBar.hidden = true;
    return;
  }

  categoryBar.hidden = false;

  const categoryItems = [
    { id: ALL_CATEGORY_KEY, name: '\u0627\u0644\u0643\u0644', icon: '\uD83C\uDF7D\uFE0F' },
    ...categories,
  ];

  categoryItems.forEach((category) => {
    const categoryValue = category.id === ALL_CATEGORY_KEY ? ALL_CATEGORY_KEY : category.name;
    const el = document.createElement('div');
    el.className = `category-item ${categoryValue === activeCategory ? 'active' : ''}`;
    el.onclick = () => {
      activeCategory = categoryValue;
      document.querySelectorAll('.category-item').forEach((node) => node.classList.remove('active'));
      el.classList.add('active');
      renderProducts();
    };

    el.innerHTML = `
      <div class="category-icon">${category.icon || '\uD83C\uDF7D\uFE0F'}</div>
      <span class="category-label">${category.name}</span>
    `;

    categoryContainer.appendChild(el);
  });
}

function renderProducts() {
  productsContainer.innerHTML = '';

  const filtered = activeCategory && activeCategory !== ALL_CATEGORY_KEY
    ? products.filter((product) => product.category === activeCategory)
    : products;

  if (filtered.length === 0) {
    const emptyMessage = activeCategory && activeCategory !== ALL_CATEGORY_KEY
      ? '\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0646\u062A\u062C\u0627\u062A \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u062D\u0627\u0644\u064A\u064B\u0627.'
      : '\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0646\u062A\u062C\u0627\u062A \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u064B\u0627.';
    productsContainer.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
    return;
  }

  filtered.forEach((product) => {
    const el = document.createElement('div');
    el.className = 'product-card';
    const productMedia = product.image_url
      ? `<img class="product-image" src="${product.image_url}" alt="${product.name}" loading="lazy" />`
      : '<div class="product-image-placeholder">بدون صورة</div>';
    el.innerHTML = `
      <div class="product-image-wrap">
        <div class="product-price-badge">${product.price} \u062F.\u062C</div>
        ${productMedia}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
      </div>
    `;
    productsContainer.appendChild(el);
  });
}

async function loadData() {
  try {
    if (!hasSupabaseConfig) {
      siteSettings = normalizeSiteSettings(DEFAULT_SITE_SETTINGS);
      categories = [];
      products = [];
    } else {
      const settingsPromise = supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      let categoriesPromise = supabase
        .from('categories')
        .select('*')
        .order('order_index');

      const productsPromise = supabase
        .from('products')
        .select('*')
        .eq('is_available', true);

      let [settingsRes, catRes, prodRes] = await Promise.all([
        settingsPromise,
        categoriesPromise,
        productsPromise,
      ]);

      if (catRes.error && isMissingOrderIndexError(catRes.error)) {
        catRes = await supabase.from('categories').select('*');
      }

      if (settingsRes.error && !isMissingSiteSettingsError(settingsRes.error)) {
        throw settingsRes.error;
      }

      if (catRes.error) {
        throw catRes.error;
      }

      if (prodRes.error) {
        throw prodRes.error;
      }

      categories = catRes.data || [];
      products = prodRes.data || [];
      siteSettings = settingsRes.error && isMissingSiteSettingsError(settingsRes.error)
        ? normalizeSiteSettings(DEFAULT_SITE_SETTINGS)
        : normalizeSiteSettings(settingsRes.data || DEFAULT_SITE_SETTINGS);
    }
  } catch (err) {
    console.error('Error loading data:', err);
    siteSettings = normalizeSiteSettings(DEFAULT_SITE_SETTINGS);
    categories = [];
    products = [];
  }

  activeCategory = categories.length ? ALL_CATEGORY_KEY : null;

  applyHeroSettings();
  renderSocialLinks();
  renderActionButtons();
  renderCategories();
  renderProducts();
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();
});
