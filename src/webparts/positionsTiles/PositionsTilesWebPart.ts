import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'PositionsTilesWebPartStrings';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneDropdown } from '@microsoft/sp-webpart-base';
import { Tiles, ITilesProps, ITileInfo, LinkTarget } from './components';

export interface ITilesWebPartProps {
  collectionData: ITileInfo[];
  tileHeight: number;
  tilesPerRow : number;
  tileType : string;
  defaultColor : string;
  textColor : string;
  title: string;
}

export interface IPositionsTilesWebPartProps {
  description: string;
}

export default class PositionsTilesWebPart extends BaseClientSideWebPart<ITilesWebPartProps> {

  private propertyFieldNumber;
  private propertyFieldCollectionData;
  private customCollectionFieldType;
  private propertyFieldColor;
  private propertyFieldColorStyle;

  public render(): void {
    const element: React.ReactElement<ITilesProps> = React.createElement(
      Tiles,
      {
        title: this.properties.title,
        tileHeight: this.properties.tileHeight,
        tileType : this.properties.tileType,
        tilesPerRow : this.properties.tilesPerRow,
        defaultColor : this.properties.defaultColor,
        textColor : this.properties.textColor,
        collectionData: this.properties.collectionData,
        displayMode: this.displayMode,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fPropertyPaneOpen: this.context.propertyPane.open
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components

    const { PropertyFieldNumber } = await import (
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/propertyFields/number'
    );
    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import (
      /* webpackChunkName: 'pnp-propcontrols-colldata' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );

    const { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } = await import (
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker'
    );

    this.propertyFieldNumber = PropertyFieldNumber;
    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
    this.propertyFieldColor = PropertyFieldColorPicker;
    this.propertyFieldColorStyle = PropertyFieldColorPickerStyle;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                this.propertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: strings.tilesDataLabel,
                  panelHeader: strings.tilesPanelHeader,
                  manageBtnLabel: strings.tilesManageBtn,
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "title",
                      title: strings.titleField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "description",
                      title: strings.descriptionField,
                      type: this.customCollectionFieldType.string,
                      required: false
                    },
                    {
                      id: "url",
                      title: strings.urlField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "picture",
                      title: strings.pictureField,
                      type: this.customCollectionFieldType.url,
                      required: true
                    },
                    {
                      id: "target",
                      title: strings.targetField,
                      type: this.customCollectionFieldType.dropdown,
                      options: [
                        {
                          key: LinkTarget.parent,
                          text: strings.targetCurrent
                        },
                        {
                          key: LinkTarget.blank,
                          text: strings.targetNew
                        }
                      ]
                    }
                  ]
                }),
                this.propertyFieldColor(
                  'defaultColor', {
                    label: 'Default Color',
                    selectedColor: this.properties.defaultColor,
                    properties: this.properties,
                    disabled: false,
                    isHidden: false,
                    alphaSliderHidden: false,
                    style: this.propertyFieldColorStyle.Full,
                    iconName: 'Precipitation',
                    key: 'colorFieldId',
                    onPropertyChange: this.onPropertyPaneFieldChanged
                }),
                this.propertyFieldNumber('tileHeight', {
                  key: "tileHeight",
                  label: strings.TileHeight,
                  value: this.properties.tileHeight
                }),
                PropertyPaneDropdown('tileType',{
                  label : 'Tile Type',
                  options:[{
                    key: "flip",
                    text: "Flip Tile"
                  },
                  {
                    key: "slide",
                    text: "Slide Tile"
                  }]
                }),
                PropertyPaneDropdown('textColor',{
                  label : 'Text Color',
                  selectedKey : '#FFF',
                  options:[{
                    key: "#FFF",
                    text: "White"
                  },
                  {
                    key: "#000",
                    text: "Black"
                  },
                  {
                    key: '#3F3F3F',
                    text : 'Grey'
                  }]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
