import * as React from "react";
import styles from "./Tile.module.scss";
import { ITileProps } from ".";
import { Icon } from "office-ui-fabric-react/lib/components/Icon";

export class Tile extends React.Component<ITileProps, {}> {
  public render(): React.ReactElement<ITileProps> {

    const tileStyle: React.CSSProperties = {};
    if (this.props.height) {
      tileStyle.height = `${this.props.height}px`;
      tileStyle.width = `${this.props.height}px`;
    }
    const innerTileStyle: React.CSSProperties = {};
    const color : React.CSSProperties ={};

    switch (this.props.tileType) {
      case "flip":

        innerTileStyle.backgroundImage = `linear-gradient(${this.props.color}, ${this.props.color}),url("${
          this.props.item.picture
        }?RenditionID=6")`;
        color.backgroundColor = this.props.color;
        color.color = this.props.textColor;
        return (
          <div className={styles.tile} style={tileStyle}>
            <a
              href={this.props.item.url}
              target={this.props.item.target}
              title={this.props.item.title}
            >
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront} style={innerTileStyle}>
                  <div className={styles.filpCardText}>
                    <h2 style={{color: this.props.textColor}}>{this.props.item.title}</h2>
                  </div>
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.filpCardText}>
                    <p style={{color: this.props.textColor}} >{this.props.item.description}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        );
      case "slide":
        innerTileStyle.backgroundImage = `url("${
          this.props.item.picture
        }?RenditionID=6")`;
        color.backgroundColor = this.props.color;
        color.color = this.props.textColor;
        return (
          <div className={styles.tile} style={tileStyle}>
            <a
              href={this.props.item.url}
              target={this.props.item.target}
              title={this.props.item.title}
              style={innerTileStyle}
            >
              <div style={color} className={styles.tileTitle}>{this.props.item.title}</div>
              <div style={color} className={styles.overflow}>
                {this.props.item.description}
              </div>
            </a>
          </div>
        );
      default:
        return(
          <div></div>
        );

    }
  }
}
