import { FontSizes } from '@fluentui/theme';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Container } from 'react-bootstrap';
import { useTheme } from '@fluentui/react-theme-provider';
import { DocumentCardPreview, IDocumentCardPreviewProps } from 'office-ui-fabric-react/lib/DocumentCard';
import { Card, ICardTokens } from '@uifabric/react-cards';
import { FontWeights, ITextStyles } from 'office-ui-fabric-react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getServices } from '../services/Requests';
import { redirectToLink } from '../services/Utils';


const Services = () => {
    var theme = useTheme();
    let cardProps = (iconName?: string, backgroundColor?: string): IDocumentCardPreviewProps => {
        return {
            previewImages: [ 
                {
                    previewIconProps: {
                        iconName: iconName,
                        styles: { root: { fontSize: FontSizes.size32, color: theme.palette.white } },
                    },
                    width: 100, height: 100
                },
            ],
            styles: { previewIcon: { backgroundColor: backgroundColor } },
        }
    };
    
    const siteTextStyles: ITextStyles = {
        root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size14, color: theme.palette.themePrimary },
    };
    
    const descriptionTextStyles: ITextStyles = {
        root: { fontWeight: FontWeights.regular, fontSize: FontSizes.size12 },
    };
    
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    
    let services = getServices();

    return (
        <Container className="services text-center">
            <div className="text-center mb-3">
                <Text style={{ fontSize: FontSizes.size14 }}>
                    Qui è possibile trovare tutti i link a servizi e risorse utili legati all'ambito universitario.
                </Text>
            </div>

            <Row className="m-2 justify-content-center">
                {
                    services.map((x, i) => (
                        <Col xl={4} lg={6} md={6} sm={12} xs={12} className="mb-3" key={i}>
                            <Card label={x.name} onClick={() => redirectToLink(x.link ?? "")} horizontal tokens={cardTokens}>
                                <Card.Item fill>
                                    <DocumentCardPreview {...cardProps(x.icon, x.color)}/>
                                </Card.Item>
                                <Card.Section>
                                    <Text variant="small" styles={siteTextStyles}>{x.name}</Text>
                                    <Text styles={descriptionTextStyles}>{x.description}</Text>
                                    {/*
                                    <Text variant="small" styles={helpfulTextStyles}>
                                    Is this recommendation helpful?
                                    </Text>
                                    */}
                                </Card.Section>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default Services;