"use client";

import { useState, useEffect } from 'react';
import {
    Filter,
    DatabaseZap,
    Activity,
    MessagesSquare,
    MessageCircle,
    Settings,
    TrendingUp,
} from 'lucide-react';
import styles from './Radar.module.css';
import { useLanguage } from './LanguageContext';

const CARDS_DATA = {
    en: [
        { type: 'growth', heading: 'Revenue Growth Opportunity Detected', insight: 'High inbound enquiry volume but low conversion rate.', solution: 'Automated qualification and follow-up workflows designed to convert enquiries into paying customers.', score: 94 },
        { type: 'conversion', heading: 'Conversion Increase Opportunity Detected', insight: 'Customer enquiries are delayed while requests are manually routed.', solution: 'Automated request classification and routing to accelerate response times and increase conversions.', score: 89 },
        { type: 'demand', heading: 'Demand Expansion Opportunity Detected', insight: 'Recurring customer requests reveal emerging demand patterns.', solution: 'Customer signal analysis system identifying profitable demand trends.', score: 82 },
        { type: 'protection', heading: 'Revenue Protection Opportunity Detected', insight: 'Customer enquiries outside operating hours receive delayed responses.', solution: '24/7 automated enquiry intake system capturing revenue that would otherwise be lost.', score: 87 },
    ],
    th: [
        { type: 'growth', heading: '???????????????????????????????', insight: '?????????????????????????????? ???????????????????????????????', solution: '??????????????????????????????????????????????????????????????????????????????????????????????', score: 94 },
        { type: 'conversion', heading: '??????????????????????????????????????????????', insight: '??????????????????????????????????????????????????????', solution: '????????????????????????????????????????????????????????????????????????????????????????????????????', score: 89 },
        { type: 'demand', heading: '???????????????????????????????', insight: '???????????????????????????? ??????????????????????????????????????????', solution: '???????????????????????????????????????????????????????????', score: 82 },
        { type: 'protection', heading: '????????????????????????????', insight: '?????????????????????????????????????????????????????????????', solution: '??????????????????????????????? 24/7 ????????????????????????????????', score: 87 },
    ],
};

const SIGNALS_DATA = {
    en: [
        { type: 'growth', label: 'Growth Signal', source: 'Reddit /r/smallbusiness', text: '"We get plenty of website enquiries but most people disappear after asking for pricing."' },
        { type: 'conversion', label: 'Conversion Signal', source: 'G2 Software Review', text: '"Our biggest issue is that enquiries come through email, WhatsApp and the website - it\'s hard to track and respond quickly."' },
        { type: 'demand', label: 'Demand Signal', source: 'Shopify Community Forum', text: '"Customers keep asking if we offer a subscription or monthly package, but we haven\'t set that up yet."' },
        { type: 'protection', label: 'Protection Signal', source: 'Google Business Review', text: '"I almost booked with another company because it took nearly a day to hear back."' },
    ],
    th: [
        { type: 'growth', label: '???????????????', source: 'Reddit /r/smallbusiness', text: '"????????????????????????????????????? ????????????????????????????????"' },
        { type: 'conversion', label: '??????????????????', source: 'G2 Software Review', text: '"?????????????????????????????????????????? WhatsApp ??????????? - ???????????????????????????????????????"' },
        { type: 'demand', label: '?????????????????', source: 'Shopify Community Forum', text: '"???????????????? ???????????????????????????????????????????? ????????????????????????????????"' },
        { type: 'protection', label: '?????????????????', source: 'Google Business Review', text: '"?????????????????????????????????? ?????????????????????????????????????????????"' },
    ],
};

const TRANSLATIONS = {
    en: {
        radarTitle: 'Opportunity Radar',
        radarDesc: 'The system continuously scans markets, conversations, and workflows to detect operational opportunities.',
        sourcesAnalyzed: 'Sources Analyzed',
        analytics: 'SEARCHING',
        score: 'Score:',
        insight: 'Insight Discovered',
        potentialSystem: 'Potential Solution',
        recentSignals: 'Recent Signals',
        sourceIndustry: 'Industry Discussions',
        sourceFeedback: 'Customer Feedback',
        sourceWorkflows: 'Operational Workflows',
        sourceMarket: 'Market Signals',
    },
    th: {
        radarTitle: '???????????',
        radarDesc: '???????????? ???????? ???????????????????????????????????????????????????????????',
        sourcesAnalyzed: '??????????????????????',
        analytics: '????????????',
        score: '?????:',
        insight: '???????????????????',
        potentialSystem: '???????????????????',
        recentSignals: '????????????',
        sourceIndustry: 'Industry Discussions',
        sourceFeedback: 'Customer Feedback',
        sourceWorkflows: 'Operational Workflows',
        sourceMarket: 'Market Signals',
    },
};

function SignalDetectionIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '58%', height: '58%' }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 12L19 7.5" />
            <path d="M12 12v7" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    );
}

export default function Radar() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language];
    const cards = CARDS_DATA[language];
    const signals = SIGNALS_DATA[language];
    const [activeCard, setActiveCard] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % cards.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [cards.length]);

    const activeSignal = signals[activeCard];

    return (
        <section className={`section ${styles.radarSection}`}>
            <div className={`container ${styles.containerExt}`}>
                <div className={`${styles.header} animate-on-scroll`}>
                    <div className={styles.radarIconWrap}>
                        <SignalDetectionIcon />
                    </div>
                    <h2>{t.radarTitle}</h2>
                    <p className="gradient-text">{t.radarDesc}</p>
                </div>

                <div className={styles.radarVisualization}>
                    <div className={styles.sourcesLayer}>
                        <div className={styles.sourcesLabel}>{t.sourcesAnalyzed}</div>
                        <div className={styles.nodesWrapper}>
                            <div className={`${styles.sourceNode} ${styles.source_industry} ${styles.animateFloat1}`}>
                                <MessagesSquare size={16} />
                                <span>{t.sourceIndustry}</span>
                            </div>
                            <div className={`${styles.sourceNode} ${styles.source_feedback} ${styles.animateFloat2}`}>
                                <MessageCircle size={16} />
                                <span>{t.sourceFeedback}</span>
                            </div>
                            <div className={`${styles.sourceNode} ${styles.source_workflows} ${styles.animateFloat3}`}>
                                <Settings size={16} />
                                <span>{t.sourceWorkflows}</span>
                            </div>
                            <div className={`${styles.sourceNode} ${styles.source_market} ${styles.animateFloat1}`}>
                                <TrendingUp size={16} />
                                <span>{t.sourceMarket}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mainSystemPane}>
                        <aside className={styles.signalColumn}>
                            <div className={styles.signalCardShell}>
                                {signals.map((signal, idx) => (
                                    <div
                                        key={idx}
                                        className={`${styles.signalCard} ${styles['signal_' + signal.type]} ${idx === activeCard ? styles.signalCardActive : styles.signalCardHidden}`}
                                    >
                                        <div className={styles.feedHeader}>
                                            <Activity size={16} />
                                            <span>{t.recentSignals}</span>
                                        </div>
                                        <div className={styles.signalItemHeader}>
                                            <span className={styles.signalSource}>{signal.source}</span>
                                            <span className={`${styles.signalTypeBadge} ${styles['badge_' + signal.type]}`}>
                                                {signal.label}
                                            </span>
                                        </div>
                                        <p className={styles.signalText}>{signal.text}</p>
                                    </div>
                                ))}
                            </div>
                        </aside>

                        <div className={styles.radarCoreWrap}>
                            <div className={styles.signalConnectorLeft}>
                                <div className={styles.connectorLine} />
                                <div className={styles.connectorPulseLeft} />
                            </div>

                            <div className={styles.radarCore}>
                                <div className={styles.radarSweep} />
                                <div className={styles.radarRings}>
                                    <div className={styles.ring1} />
                                    <div className={styles.ring2} />
                                    <div className={styles.ring3} />
                                </div>
                                <div className={styles.coreCenter}>
                                    <Filter size={28} />
                                    <div className={styles.coreLabel}>{t.analytics}</div>
                                </div>
                                <div className={`${styles.dataHit} ${styles.hit1}`} />
                                <div className={`${styles.dataHit} ${styles.hit2}`} />
                                <div className={`${styles.dataHit} ${styles.hit3}`} />
                            </div>

                            <div className={styles.signalConnectorRight}>
                                <div className={styles.connectorLine} />
                                <div className={styles.connectorPulseRight} />
                            </div>
                        </div>

                        <div className={styles.cardColumn}>
                            <div className={styles.opportunityCardContainer}>
                                {cards.map((card, idx) => (
                                    <div key={idx} className={`${styles.ideaCard} ${styles['card_' + card.type]} ${idx === activeCard ? styles.cardActive : styles.cardHidden}`}>
                                        <div className={styles.ideaHeader}>
                                            <div className={styles.ideaHeaderLeft}>
                                                <DatabaseZap size={16} className={styles.zapIcon} />
                                                <span>{card.heading}</span>
                                            </div>
                                            <span className={styles.tagScore}>{t.score} {card.score}</span>
                                        </div>
                                        <div className={styles.cardContentLandscape}>
                                            <div className={styles.cardDetails}>
                                                <div className={styles.cardSection}>
                                                    <span className={styles.cardLabel}>{t.insight}</span>
                                                    <p className={styles.cardInsight}>{card.insight}</p>
                                                </div>
                                                <div className={styles.cardSection}>
                                                    <span className={styles.cardLabel}>{t.potentialSystem}</span>
                                                    <p className={styles.cardSystem}>{card.solution}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



