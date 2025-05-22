// hooks/useThemeColors.ts
import { useTheme } from '../contexts/ThemeContext';

/**
 * Hook para obter as cores do tema global
 * @deprecated Use useTheme() diretamente do ThemeContext para garantir consistência global
 */
export default function useThemeColors() {
  // Usar o contexto global de tema em vez de useColorScheme diretamente
  const { isDark, colors: themeColors } = useTheme();
  
  // Manter compatibilidade com código existente
  const colors = {
    ...themeColors,
    // Propriedades adicionais que podem não existir no ThemeContext
    primary: isDark ? '#00EF7F' : '#121212',         // usada em tabs
    textSecondary: isDark ? '#A0A0A0' : '#555555',   // para ícones ou textos secundários
  };

  return { colors, isDark };
}
