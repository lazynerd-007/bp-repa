import { component$ } from "@builder.io/qwik";

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  fullscreen?: boolean;
}

export default component$<LoaderProps>(({ size = 'medium', fullscreen = false }) => {
  const sizeMap = {
    small: '24px',
    medium: '40px',
    large: '60px'
  };

  const spinnerSize = sizeMap[size];

  return (
    <div class={{ 'loader-container': true, 'fullscreen': fullscreen }}>
      <div 
        class="spinner" 
        style={{ 
          width: spinnerSize, 
          height: spinnerSize 
        }}
      ></div>
    </div>
  );
}); 