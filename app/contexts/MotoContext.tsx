import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Animated } from 'react-native';

export type Moto = {
  id: string;
  placa: string;
  modelo: string;
  cor: string;
  pan: Animated.ValueXY;
  posX: number;
  posY: number;
  historico: string[];
};

interface MotoContextProps {
  motos: Moto[];
  adicionarMoto: (moto: Moto) => void; // Espera um objeto Moto completo
  moverMoto: (id: string, newX: number, newY: number) => void;
}

export const MotoContext = createContext<MotoContextProps>({} as MotoContextProps);

export const MotoProvider = ({ children }: { children: ReactNode }) => {
  const [motos, setMotos] = useState<Moto[]>([]);

  // Modificar para aceitar um objeto Moto completo
  const adicionarMoto = (moto: Moto) => {
    setMotos((prev) => [...prev, moto]);
  };

  const moverMoto = (id: string, newX: number, newY: number) => {
    setMotos((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              posX: newX,
              posY: newY,
              pan: new Animated.ValueXY({ x: newX, y: newY }),
              historico: [...m.historico, `Movida para: ${newX}, ${newY}`],
            }
          : m
      )
    );
  };

  return (
    <MotoContext.Provider value={{ motos, adicionarMoto, moverMoto }}>
      {children}
    </MotoContext.Provider>
  );
};

export const useMotoContext = () => useContext(MotoContext);
