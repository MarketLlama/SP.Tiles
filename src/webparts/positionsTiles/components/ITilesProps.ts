import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ITilesWebPartProps } from './../PositionsTilesWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface ITilesProps extends ITilesWebPartProps {
  displayMode: DisplayMode;

  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}
