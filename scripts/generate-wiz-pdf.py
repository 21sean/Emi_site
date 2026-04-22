#!/usr/bin/env python3
"""Generate a redesigned Google × Wiz M&A presentation PDF."""

from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.units import inch, mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import Paragraph, Frame, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
import os

# ── Page Setup ──────────────────────────────────────────
W, H = landscape(A4)  # 842 x 595
MARGIN = 50
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(SCRIPT_DIR, "assets")
OUTPUT = os.path.join(SCRIPT_DIR, "..", "public", "google-wiz-ma.pdf")

# ── Color Palette ───────────────────────────────────────
NAVY      = HexColor("#0f172a")
DARK_BLUE = HexColor("#1e293b")
MID_BLUE  = HexColor("#334155")
SLATE     = HexColor("#64748b")
LIGHT_BG  = HexColor("#f8fafc")
ACCENT    = HexColor("#2563eb")
GOLD      = HexColor("#f59e0b")
GOLD_DARK = HexColor("#d97706")
RED_SOFT  = HexColor("#ef4444")
GREEN     = HexColor("#22c55e")
BORDER    = HexColor("#e2e8f0")
TEXT_DARK  = HexColor("#0f172a")
TEXT_MID   = HexColor("#334155")
TEXT_LIGHT = HexColor("#64748b")
CARD_BG    = HexColor("#f1f5f9")
WIZ_PURPLE = HexColor("#4938e9")

# ── Asset paths ─────────────────────────────────────────
def asset(name):
    return os.path.join(ASSETS, name)

# ── Helpers ─────────────────────────────────────────────
def draw_bg_solid(c, color=white):
    c.setFillColor(color)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def draw_page_number(c, num, total=22, color=SLATE):
    c.setFont("Helvetica", 8)
    c.setFillColor(color)
    c.drawRightString(W - MARGIN, 25, f"{num}  /  {total}")

def draw_footer_line(c, color=BORDER):
    c.setStrokeColor(color)
    c.setLineWidth(0.5)
    c.line(MARGIN, 45, W - MARGIN, 45)

def draw_top_bar(c, color=NAVY, height=6):
    c.setFillColor(color)
    c.rect(0, H - height, W, height, fill=1, stroke=0)

def draw_accent_line(c, x, y, w, color=ACCENT, thickness=3):
    c.setStrokeColor(color)
    c.setLineWidth(thickness)
    c.line(x, y, x + w, y)

def draw_rounded_rect(c, x, y, w, h, r=8, fill_color=CARD_BG, stroke_color=None):
    c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.roundRect(x, y, w, h, r, fill=1, stroke=1)
    else:
        c.roundRect(x, y, w, h, r, fill=1, stroke=0)

def draw_text_block(c, text, x, y, font="Helvetica", size=11, color=TEXT_MID, max_width=None, leading=16):
    style = ParagraphStyle(
        'custom', fontName=font, fontSize=size, textColor=color,
        leading=leading, alignment=TA_LEFT
    )
    p = Paragraph(text, style)
    w = max_width or (W - 2 * MARGIN)
    pw, ph = p.wrap(w, 1000)
    p.drawOn(c, x, y - ph)
    return y - ph

def draw_bullet_list(c, items, x, y, font="Helvetica", size=10, color=TEXT_MID, max_width=None, spacing=4, leading=15):
    w = max_width or (W - 2 * MARGIN - x)
    for item in items:
        style = ParagraphStyle(
            'bullet', fontName=font, fontSize=size, textColor=color,
            leading=leading, leftIndent=14, firstLineIndent=-14,
            alignment=TA_LEFT
        )
        text = f"<font color='#{ACCENT.hexval()[2:]}'>\u2022</font>  {item}"
        p = Paragraph(text, style)
        pw, ph = p.wrap(w, 1000)
        p.drawOn(c, x, y - ph)
        y = y - ph - spacing
    return y

def draw_img(c, path, x, y, width=None, height=None):
    """Draw an image. x,y is bottom-left corner."""
    try:
        c.drawImage(path, x, y, width=width, height=height,
                    preserveAspectRatio=True, mask='auto')
    except Exception as e:
        print(f"Warning: could not draw image {path}: {e}")

def draw_decorative_dots(c, x, y, cols, rows, spacing=12, color=BORDER, radius=2):
    """Draw a grid of decorative dots."""
    c.setFillColor(color)
    for row in range(rows):
        for col in range(cols):
            cx = x + col * spacing
            cy = y - row * spacing
            c.circle(cx, cy, radius, fill=1, stroke=0)

def draw_gradient_rect(c, x, y, w, h, color1, color2, steps=20):
    """Simulate a vertical gradient with horizontal strips."""
    strip_h = h / steps
    for i in range(steps):
        r = color1.red + (color2.red - color1.red) * i / steps
        g = color1.green + (color2.green - color1.green) * i / steps
        b = color1.blue + (color2.blue - color1.blue) * i / steps
        c.setFillColor(HexColor(f"#{int(r*255):02x}{int(g*255):02x}{int(b*255):02x}"))
        c.rect(x, y + h - (i+1)*strip_h, w, strip_h + 0.5, fill=1, stroke=0)


# ═══════════════════════════════════════════════════════
# SLIDES
# ═══════════════════════════════════════════════════════

def slide_title(c):
    """Page 1: Title slide — full visual impact."""
    # Dark navy background
    draw_bg_solid(c, NAVY)

    # Subtle gradient overlay at bottom
    draw_gradient_rect(c, 0, 0, W, 180, DARK_BLUE, NAVY)

    # Decorative dot pattern (top-right)
    draw_decorative_dots(c, W - 200, H - 40, 12, 8, spacing=14, color=MID_BLUE, radius=1.5)

    # Decorative dot pattern (bottom-left)
    draw_decorative_dots(c, 60, 170, 8, 6, spacing=14, color=MID_BLUE, radius=1.5)

    # Gold accent bar at very top
    c.setFillColor(GOLD)
    c.rect(0, H - 8, W, 8, fill=1, stroke=0)

    # Large diagonal accent shape (top-right)
    c.setFillColor(HexColor("#1e293b"))
    path = c.beginPath()
    path.moveTo(W - 350, H - 8)
    path.lineTo(W, H - 8)
    path.lineTo(W, H - 220)
    path.close()
    c.drawPath(path, fill=1, stroke=0)

    # Google logo (top-left area)
    draw_img(c, asset("google_logo.png"), MARGIN + 20, H - 120, width=180, height=60)

    # "×" connector
    c.setFont("Helvetica-Bold", 36)
    c.setFillColor(GOLD)
    c.drawCentredString(MARGIN + 240, H - 108, "×")

    # Wiz logo (next to Google)
    draw_img(c, asset("wiz_logo.png"), MARGIN + 270, H - 125, width=120, height=60)

    # Shield icon (right side)
    draw_img(c, asset("shield.png"), W - 220, H - 250, width=100, height=120)

    # Cloud icon (far right, semi-transparent area)
    draw_img(c, asset("cloud.png"), W - 340, H - 200, width=120, height=80)

    # Title text
    c.setFont("Helvetica-Bold", 44)
    c.setFillColor(white)
    c.drawString(MARGIN + 20, H - 230, "M&A Strategic &")
    c.drawString(MARGIN + 20, H - 280, "Valuation Analysis")

    # Accent line under title
    draw_accent_line(c, MARGIN + 20, H - 298, 140, color=GOLD, thickness=3)

    # $32B callout box
    draw_rounded_rect(c, MARGIN + 20, H - 380, 180, 60, r=10, fill_color=HexColor("#1e293b"), stroke_color=MID_BLUE)
    c.setFont("Helvetica-Bold", 28)
    c.setFillColor(GOLD)
    c.drawString(MARGIN + 38, H - 360, "$32B")
    c.setFont("Helvetica", 11)
    c.setFillColor(HexColor("#94a3b8"))
    c.drawString(MARGIN + 115, H - 357, "All-Cash")

    # Merger arrows icon
    draw_img(c, asset("merger.png"), MARGIN + 230, H - 385, width=100, height=65)

    # Authors
    c.setFont("Helvetica", 13)
    c.setFillColor(HexColor("#94a3b8"))
    c.drawString(MARGIN + 20, 100, "Ryan Benirschke  ·  Stone Chung  ·  Alicia Hsiao  ·  Emi Kobayashi  ·  Dean Wu")

    # Course info
    c.setFont("Helvetica", 11)
    c.setFillColor(SLATE)
    c.drawString(MARGIN + 20, 75, "Mergers & Acquisitions  |  Fall 2025  |  UC San Diego")


def slide_agenda(c):
    """Page 2: Agenda."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 32)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Agenda")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    # Decorative dots top-right
    draw_decorative_dots(c, W - 160, H - 50, 8, 5, spacing=14, color=HexColor("#e2e8f0"), radius=2)

    items = [
        ("01", "Background", "Industry landscape & competitive positioning", asset("cloud.png")),
        ("02", "Google's Acquisition", "Timeline, synergies & strategic rationale", asset("merger.png")),
        ("03", "Strategic Outlook", "Market gaps, consolidation & alternatives", asset("chart.png")),
        ("04", "Acquisition Deal Structure", "Valuation, premiums & regulatory review", asset("money.png")),
        ("05", "Our Team Analysis", "Final verdict & conclusions", asset("shield.png")),
    ]

    y_start = H - 145
    for i, (num, title, desc, icon) in enumerate(items):
        y = y_start - i * 85

        # Number circle
        c.setFillColor(ACCENT if i == 0 else CARD_BG)
        c.circle(MARGIN + 28, y + 15, 22, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 16)
        c.setFillColor(white if i == 0 else ACCENT)
        c.drawCentredString(MARGIN + 28, y + 9, num)

        # Title and description
        c.setFont("Helvetica-Bold", 17)
        c.setFillColor(TEXT_DARK)
        c.drawString(MARGIN + 65, y + 18, title)

        c.setFont("Helvetica", 11)
        c.setFillColor(TEXT_LIGHT)
        c.drawString(MARGIN + 65, y - 2, desc)

        # Icon on right side
        draw_img(c, icon, W - MARGIN - 60, y - 8, width=45, height=40)

        # Divider line
        if i < len(items) - 1:
            c.setStrokeColor(BORDER)
            c.setLineWidth(0.5)
            c.line(MARGIN + 65, y - 20, W - MARGIN, y - 20)

    draw_footer_line(c)
    draw_page_number(c, 2)


def slide_section_divider(c, number, title, page_num, icon_path=None):
    """Section divider slide with optional icon."""
    draw_bg_solid(c, NAVY)
    c.setFillColor(GOLD)
    c.rect(0, H - 6, W, 6, fill=1, stroke=0)

    # Decorative dots
    draw_decorative_dots(c, W - 180, H - 60, 10, 6, spacing=14, color=MID_BLUE, radius=1.5)
    draw_decorative_dots(c, 60, 130, 6, 5, spacing=14, color=MID_BLUE, radius=1.5)

    # Large section number (watermark)
    c.setFont("Helvetica-Bold", 140)
    c.setFillColor(HexColor("#1e293b"))
    c.drawString(MARGIN + 10, H / 2 - 30, f"0{number}")

    # Section title
    c.setFont("Helvetica-Bold", 36)
    c.setFillColor(white)
    c.drawString(MARGIN + 200, H / 2 + 10, title)

    draw_accent_line(c, MARGIN + 200, H / 2 - 8, 100, GOLD, 3)

    # Icon
    if icon_path:
        draw_img(c, icon_path, W - 200, H / 2 - 50, width=100, height=100)

    c.setFont("Helvetica", 8)
    c.setFillColor(HexColor("#475569"))
    c.drawRightString(W - MARGIN, 25, f"{page_num}  /  22")


def slide_industry_background(c):
    """Page 4: Industry Background."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Industry Background")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    # Cloud icon top-right
    draw_img(c, asset("cloud.png"), W - 170, H - 105, width=80, height=55)

    # Description
    y = draw_text_block(c,
        "Wiz is a cloud security platform that helps organizations identify, prioritize, and remediate risks "
        "across their cloud environments through agentless, multi-cloud visibility and analysis.",
        MARGIN, H - 115, size=11, color=TEXT_MID, max_width=W - 2*MARGIN - 100, leading=16)

    # Two category cards
    card_w = (W - 2*MARGIN - 30) / 2

    # CSPM Card
    draw_rounded_rect(c, MARGIN, y - 90, card_w, 80, fill_color=HexColor("#eff6ff"), stroke_color=HexColor("#bfdbfe"))
    # Shield icon in card
    draw_img(c, asset("shield.png"), MARGIN + card_w - 60, y - 85, width=40, height=48)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(ACCENT)
    c.drawString(MARGIN + 15, y - 25, "Cloud Security Posture Management (CSPM)")
    c.setFont("Helvetica", 9)
    c.setFillColor(TEXT_MID)
    c.drawString(MARGIN + 15, y - 41, "Continuous monitoring of cloud infrastructure")
    c.drawString(MARGIN + 15, y - 54, "for misconfigurations and compliance violations")

    # CNAPP Card
    draw_rounded_rect(c, MARGIN + card_w + 30, y - 90, card_w, 80, fill_color=HexColor("#fef3c7"), stroke_color=HexColor("#fde68a"))
    draw_img(c, asset("cloud.png"), MARGIN + 2*card_w - 30, y - 85, width=40, height=30)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(GOLD_DARK)
    c.drawString(MARGIN + card_w + 45, y - 25, "Cloud-Native Application Protection (CNAPP)")
    c.setFont("Helvetica", 9)
    c.setFillColor(TEXT_MID)
    c.drawString(MARGIN + card_w + 45, y - 41, "End-to-end security for cloud-native applications")
    c.drawString(MARGIN + card_w + 45, y - 54, "from development through runtime")

    # Porter's Five Forces
    forces_y = y - 125
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, forces_y, "Porter's Five Forces Analysis")

    forces = [
        ("Threat of New\nEntrants", "Moderate", GOLD),
        ("Threat of\nSubstitutes", "Moderate", GOLD),
        ("Competitive\nRivalry", "High", RED_SOFT),
        ("Buyer Bargaining\nPower", "Moderate", GOLD),
        ("Supplier Bargaining\nPower", "Low", GREEN),
    ]

    box_w = (W - 2*MARGIN - 4*15) / 5
    for i, (label, level, color) in enumerate(forces):
        bx = MARGIN + i * (box_w + 15)
        by = forces_y - 105
        draw_rounded_rect(c, bx, by, box_w, 90, fill_color=LIGHT_BG, stroke_color=BORDER)

        lines = label.split("\n")
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(TEXT_DARK)
        for j, line in enumerate(lines):
            c.drawCentredString(bx + box_w/2, by + 68 - j*13, line)

        # Level badge
        badge_w = 70
        draw_rounded_rect(c, bx + (box_w - badge_w)/2, by + 10, badge_w, 24, r=12, fill_color=color)
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(white)
        c.drawCentredString(bx + box_w/2, by + 17, level)

    draw_footer_line(c)
    draw_page_number(c, 4)


def slide_strategic_positioning(c):
    """Page 5: Strategic Positioning & Acquisition Rationale."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Strategic Positioning & Acquisition Rationale")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    col_w = (W - 2*MARGIN - 40) / 3

    # Column 1: Competitive Positioning
    cx = MARGIN
    cy = H - 130
    draw_rounded_rect(c, cx, cy - 330, col_w, 330, fill_color=HexColor("#eff6ff"), stroke_color=HexColor("#bfdbfe"))
    # Icon
    draw_img(c, asset("shield.png"), cx + col_w/2 - 20, cy - 60, width=40, height=48)
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(ACCENT)
    c.drawCentredString(cx + col_w/2, cy - 80, "Competitive Positioning")
    draw_bullet_list(c, [
        "Agentless architecture",
        "Fast, frictionless deployment",
        "Full cloud-wide visibility",
        "50% Fortune 100 penetration",
    ], cx + 15, cy - 100, size=10, max_width=col_w - 30)

    # Column 2: Why Google
    cx2 = MARGIN + col_w + 20
    draw_rounded_rect(c, cx2, cy - 330, col_w, 330, fill_color=HexColor("#f0fdf4"), stroke_color=HexColor("#bbf7d0"))
    draw_img(c, asset("google_logo.png"), cx2 + col_w/2 - 40, cy - 55, width=80, height=30)
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(GREEN)
    c.drawCentredString(cx2 + col_w/2, cy - 80, "Why Google")
    draw_bullet_list(c, [
        "Accelerate scaling through Google Cloud ecosystem",
        "Expand R&D using Google's AI and security infrastructure",
        "Enable high-value liquidity event for investors",
    ], cx2 + 15, cy - 100, size=10, max_width=col_w - 30)

    # Column 3: Wiz's Alternatives
    cx3 = MARGIN + 2*(col_w + 20)
    draw_rounded_rect(c, cx3, cy - 330, col_w, 330, fill_color=HexColor("#fef3c7"), stroke_color=HexColor("#fde68a"))
    draw_img(c, asset("wiz_logo.png"), cx3 + col_w/2 - 30, cy - 55, width=60, height=28)
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(GOLD_DARK)
    c.drawCentredString(cx3 + col_w/2, cy - 80, "Wiz's Alternatives")
    draw_bullet_list(c, [
        "Remain independent",
        "Pursue an IPO",
        "Form strategic alliances",
        "Engage other acquirers (AWS, Microsoft, Palo Alto, CrowdStrike)",
    ], cx3 + 15, cy - 100, size=10, max_width=col_w - 30)

    draw_footer_line(c)
    draw_page_number(c, 5)


def slide_acquisition_timeline(c):
    """Page 7: Acquisition Timeline."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Acquisition Timeline")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    # Merger icon top-right
    draw_img(c, asset("merger.png"), W - 170, H - 100, width=90, height=55)

    events = [
        ("2020", "Wiz Founded", "Cloud security startup launched by former Microsoft engineers"),
        ("2021–2022", "Hypergrowth", "ARR surges from $1M to $100M in just 18 months"),
        ("2024", "Google's First Offer", "Wiz rejects Google Cloud's $23B acquisition offer"),
        ("2025", "$32B Acquisition", "Google and Wiz announce all-cash agreement — Google's largest acquisition ever"),
    ]

    # Timeline line
    line_y = H / 2 + 20
    c.setStrokeColor(BORDER)
    c.setLineWidth(3)
    c.line(MARGIN + 40, line_y, W - MARGIN - 40, line_y)

    spacing = (W - 2*MARGIN - 80) / (len(events) - 1)

    for i, (year, title, desc) in enumerate(events):
        x = MARGIN + 40 + i * spacing
        is_highlight = (i == len(events) - 1)

        # Circle on timeline
        c.setFillColor(GOLD if is_highlight else ACCENT)
        c.circle(x, line_y, 10, fill=1, stroke=0)
        c.setFillColor(white)
        c.circle(x, line_y, 4, fill=1, stroke=0)

        # Year above
        c.setFont("Helvetica-Bold", 14)
        c.setFillColor(GOLD if is_highlight else ACCENT)
        c.drawCentredString(x, line_y + 30, year)

        # Card below
        card_w = 155
        card_h = 110
        card_x = x - card_w/2
        card_y = line_y - 30 - card_h
        fill = HexColor("#fef3c7") if is_highlight else CARD_BG
        stroke = HexColor("#fde68a") if is_highlight else BORDER
        draw_rounded_rect(c, card_x, card_y, card_w, card_h, fill_color=fill, stroke_color=stroke)

        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(TEXT_DARK)
        c.drawCentredString(x, card_y + card_h - 22, title)

        style = ParagraphStyle('tl', fontName='Helvetica', fontSize=9, textColor=TEXT_MID,
                               leading=12, alignment=TA_CENTER)
        p = Paragraph(desc, style)
        pw, ph = p.wrap(card_w - 20, 80)
        p.drawOn(c, card_x + 10, card_y + 10)

    # Growth chart icon in bottom-right
    draw_img(c, asset("chart.png"), W - 160, 55, width=80, height=55)

    draw_footer_line(c)
    draw_page_number(c, 7)


def slide_synergies(c):
    """Page 8: Acquisition Synergies."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Acquisition Synergies")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    synergies = [
        ("Innovation Acceleration",
         "Integration into Google Cloud accelerates product development through AI infrastructure and resources.",
         "Faster innovation and time-to-market",
         HexColor("#eff6ff"), ACCENT, asset("chart.png")),
        ("AI-Driven Cloud Security",
         "Investment focuses on advancing AI-era cloud security and multi-cloud capabilities.",
         "Improved security design, automation, and threat prevention across AI workloads",
         HexColor("#f0fdf4"), GREEN, asset("shield.png")),
        ("Operational Efficiency",
         "Automated platform scales security operations and reduces manual workload.",
         "Lower total cost of ownership and improved management efficiency",
         HexColor("#fef3c7"), GOLD_DARK, asset("cloud.png")),
        ("Market Expansion",
         "Wiz's enterprise and startup customer base complements Google's market reach.",
         "Broader adoption of Google Cloud and enhanced enterprise growth",
         HexColor("#faf5ff"), HexColor("#a855f7"), asset("merger.png")),
    ]

    card_w = (W - 2*MARGIN - 20) / 2
    card_h = 170

    for i, (title, desc, benefit, bg, accent, icon) in enumerate(synergies):
        col = i % 2
        row = i // 2
        x = MARGIN + col * (card_w + 20)
        y = H - 135 - row * (card_h + 15)

        draw_rounded_rect(c, x, y - card_h, card_w, card_h, fill_color=bg, stroke_color=BORDER)

        # Accent bar on left
        c.setFillColor(accent)
        c.roundRect(x, y - card_h, 5, card_h, 3, fill=1, stroke=0)

        # Icon top-right of card
        draw_img(c, icon, x + card_w - 55, y - 50, width=38, height=35)

        c.setFont("Helvetica-Bold", 13)
        c.setFillColor(accent)
        c.drawString(x + 18, y - 22, title)

        draw_text_block(c, desc, x + 18, y - 40, size=10, color=TEXT_MID, max_width=card_w - 80, leading=14)

        # Benefit
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(accent)
        c.drawString(x + 18, y - card_h + 22, f"\u2192  {benefit[:70]}")

    draw_footer_line(c)
    draw_page_number(c, 8)


def slide_strategic_problem_1(c):
    """Page 10: Multi-Cloud Security Gap."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 65, "The Strategic Problem Google Must Solve")

    c.setFont("Helvetica-Bold", 15)
    c.setFillColor(ACCENT)
    c.drawString(MARGIN, H - 90, "Google's Structural Gap in Multi-Cloud Security")
    draw_accent_line(c, MARGIN, H - 102, 80, ACCENT, 3)

    # Cloud icon
    draw_img(c, asset("cloud.png"), W - 160, H - 100, width=75, height=50)

    # Key insight box
    draw_rounded_rect(c, MARGIN, H - 170, W - 2*MARGIN, 55, fill_color=HexColor("#fef2f2"), stroke_color=HexColor("#fecaca"))
    draw_text_block(c,
        "<b>Customers increasingly demand unified security visibility across all clouds, "
        "while Google's security tools remain largely GCP-centric.</b> This places Google at "
        "a structural disadvantage in enterprise cloud adoption.",
        MARGIN + 15, H - 123, size=11, color=HexColor("#991b1b"), max_width=W - 2*MARGIN - 30, leading=15)

    # Three reasons
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 210, "Why enterprises adopt multi-cloud:")

    reasons = [
        ("Avoid Vendor Lock-In", "Relying on a single cloud provider creates strategic and pricing risks. Multi-cloud gives enterprises stronger negotiation power and flexibility.", asset("shield.png")),
        ("Optimize Workloads", "Different clouds excel at different things — AWS for scale, Azure for enterprise integration, GCP for data/AI — so companies place each workload where it performs best.", asset("cloud.png")),
        ("Increase Resilience", "Using multiple cloud providers prevents a single point of failure and improves business continuity.", asset("chart.png")),
    ]

    card_w = (W - 2*MARGIN - 40) / 3
    for i, (title, desc, icon) in enumerate(reasons):
        x = MARGIN + i * (card_w + 20)
        y_card = H - 250
        draw_rounded_rect(c, x, y_card - 185, card_w, 185, fill_color=CARD_BG, stroke_color=BORDER)

        # Number circle
        c.setFillColor(ACCENT)
        c.circle(x + 25, y_card - 18, 15, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 14)
        c.setFillColor(white)
        c.drawCentredString(x + 25, y_card - 24, str(i + 1))

        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(TEXT_DARK)
        c.drawString(x + 48, y_card - 24, title)

        # Small icon in card
        draw_img(c, icon, x + card_w - 45, y_card - 40, width=30, height=30)

        draw_text_block(c, desc, x + 15, y_card - 48, size=9.5, color=TEXT_MID, max_width=card_w - 30, leading=13)

    draw_footer_line(c)
    draw_page_number(c, 10)


def slide_strategic_problem_2(c):
    """Page 11: Market Consolidation."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 70, "The Strategic Problem Google Must Solve")
    c.setFont("Helvetica-Bold", 15)
    c.setFillColor(ACCENT)
    c.drawString(MARGIN, H - 95, "Market Consolidation Accelerates Toward End-to-End Platforms")
    draw_accent_line(c, MARGIN, H - 107, 80, ACCENT, 3)

    left_w = (W - 2*MARGIN) * 0.55
    right_w = (W - 2*MARGIN) * 0.40

    # Quadrant diagram
    qx = MARGIN + left_w + 30
    qy = H - 140
    qw = right_w
    qh = 340

    draw_rounded_rect(c, qx, qy - qh, qw, qh, fill_color=LIGHT_BG, stroke_color=BORDER)

    ax = qx + 40
    ay = qy - qh + 40
    aw = qw - 60
    ah = qh - 80

    c.setStrokeColor(SLATE)
    c.setLineWidth(1.5)
    c.line(ax, ay, ax, ay + ah)
    c.line(ax, ay, ax + aw, ay)

    c.setFont("Helvetica", 8)
    c.setFillColor(SLATE)
    c.saveState()
    c.translate(ax - 18, ay + ah/2)
    c.rotate(90)
    c.drawCentredString(0, 0, "Capabilities \u2192")
    c.restoreState()
    c.drawCentredString(ax + aw/2, ay - 15, "Strategies \u2192")

    # Quadrant labels
    c.setFont("Helvetica", 8)
    c.setFillColor(TEXT_LIGHT)
    c.drawString(ax + 5, ay + ah - 15, "Niche Players")
    c.drawRightString(ax + aw - 5, ay + ah - 15, "Leaders")
    c.drawString(ax + 5, ay + 8, "Emerging")
    c.drawRightString(ax + aw - 5, ay + 8, "Major Players")

    c.setDash(3, 3)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(ax, ay + ah/2, ax + aw, ay + ah/2)
    c.line(ax + aw/2, ay, ax + aw/2, ay + ah)
    c.setDash()

    # Wiz
    c.setFillColor(GOLD)
    c.circle(ax + aw*0.82, ay + ah*0.85, 8, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(GOLD_DARK)
    c.drawString(ax + aw*0.82 + 12, ay + ah*0.85 - 3, "Wiz")

    # Palo Alto
    c.setFillColor(HexColor("#a855f7"))
    c.circle(ax + aw*0.75, ay + ah*0.78, 7, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(HexColor("#7c3aed"))
    c.drawString(ax + aw*0.75 + 10, ay + ah*0.78 - 3, "Palo Alto")

    # Google
    c.setFillColor(ACCENT)
    c.circle(ax + aw*0.65, ay + ah*0.42, 8, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(ACCENT)
    c.drawString(ax + aw*0.65 + 12, ay + ah*0.42 - 3, "Google")

    # Left insights
    ix = MARGIN
    iy = H - 135

    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(TEXT_DARK)
    c.drawString(ix, iy, "Google (Major Players Quadrant)")
    # Small Google logo
    draw_img(c, asset("google_logo.png"), ix + 230, iy - 5, width=50, height=18)

    iy = draw_bullet_list(c, [
        "Strong on strategy but lacking in product depth",
        "Multi-cloud visibility and integration remain limited",
        "Enterprises do not view Google as a first-choice security platform",
        "Lacks a fully integrated, end-to-end CNAPP solution",
    ], ix, iy - 18, size=10, max_width=left_w - 20, spacing=3)

    iy -= 20
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(TEXT_DARK)
    c.drawString(ix, iy, "Wiz (Leaders Quadrant)")
    # Small Wiz logo
    draw_img(c, asset("wiz_logo.png"), ix + 160, iy - 5, width=40, height=18)

    draw_bullet_list(c, [
        "Most complete multi-cloud coverage",
        "Fastest enterprise adoption (ARR growing over 100%)",
        "Leading AI-driven and graph-based cloud security",
        "Best-in-class technology capability and strategic execution",
    ], ix, iy - 18, size=10, max_width=left_w - 20, spacing=3)

    draw_footer_line(c)
    draw_page_number(c, 11)


def slide_strategic_alternatives_overview(c):
    """Page 12: Strategic Alternatives Overview."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Evaluating Google's Strategic Alternatives")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    options = [
        ("Internal Development", "Build", HexColor("#eff6ff"), ACCENT, asset("chart.png"),
         ["Full control over design and roadmap",
          "Slow: 3\u20135+ years to reach parity with Wiz",
          "Risk of falling further behind in a fast-moving market",
          "No access to Wiz's existing customer relationships"]),
        ("Partnership", "Partner", HexColor("#f0fdf4"), GREEN, asset("merger.png"),
         ["Lower cost and lower risk than acquisition",
          "Limited integration depth and control",
          "Partner may later align with a competitor",
          "Does not close the structural multi-cloud gap"]),
        ("Acquisition", "Acquire", HexColor("#fef3c7"), GOLD_DARK, asset("money.png"),
         ["Immediate access to Wiz's technology and customers",
          "Closes the multi-cloud security gap overnight",
          "High upfront cost ($32B all-cash)",
          "Integration and retention risks"]),
    ]

    card_w = (W - 2*MARGIN - 40) / 3
    card_h = 340

    for i, (title, label, bg, accent, icon, bullets) in enumerate(options):
        x = MARGIN + i * (card_w + 20)
        y = H - 130

        is_selected = (i == 2)
        stroke = accent if is_selected else BORDER
        draw_rounded_rect(c, x, y - card_h, card_w, card_h, fill_color=bg, stroke_color=stroke)

        if is_selected:
            badge_w = 70
            draw_rounded_rect(c, x + card_w - badge_w - 10, y - 12, badge_w, 22, r=11, fill_color=accent)
            c.setFont("Helvetica-Bold", 8)
            c.setFillColor(white)
            c.drawCentredString(x + card_w - badge_w/2 - 10, y - 6, "SELECTED")

        # Icon at top of card
        draw_img(c, icon, x + card_w/2 - 22, y - 55, width=44, height=38)

        c.setFont("Helvetica-Bold", 14)
        c.setFillColor(TEXT_DARK)
        c.drawCentredString(x + card_w/2, y - 100, title)

        draw_bullet_list(c, bullets, x + 15, y - 120, size=10, max_width=card_w - 30, spacing=6, leading=14)

    draw_footer_line(c)
    draw_page_number(c, 12)


def slide_strategic_alternatives_detail(c):
    """Page 13: Strategic Alternatives - Comparison Matrix."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Strategic Alternatives Comparison")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    headers = ["Criteria", "Internal Dev", "Partnership", "Acquisition"]
    rows = [
        ["Time to market", "3\u20135+ years", "1\u20132 years", "Immediate"],
        ["Cost", "Low\u2013Medium", "Low", "Very High ($32B)"],
        ["Control", "Full", "Limited", "Full"],
        ["Multi-cloud gap", "Gradual close", "Partial", "Fully closed"],
        ["Customer access", "None", "Shared", "Full (50% F100)"],
        ["Risk level", "Execution risk", "Alignment risk", "Integration risk"],
        ["Strategic impact", "Low\u2013Medium", "Medium", "Transformative"],
    ]

    table_data = [headers] + rows
    col_widths = [150, 170, 170, 170]

    style_commands = [
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_MID),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('BACKGROUND', (-1, 0), (-1, 0), ACCENT),
        ('TEXTCOLOR', (-1, 1), (-1, -1), ACCENT),
        ('FONTNAME', (-1, 1), (-1, -1), 'Helvetica-Bold'),
    ]

    t = Table(table_data, colWidths=col_widths)
    t.setStyle(TableStyle(style_commands))
    tw, th = t.wrap(0, 0)
    t.drawOn(c, MARGIN + (W - 2*MARGIN - tw)/2, H - 130 - th)

    # Decorative dots
    draw_decorative_dots(c, W - 130, 60, 6, 3, spacing=14, color=HexColor("#e2e8f0"), radius=2)

    draw_footer_line(c)
    draw_page_number(c, 13)


def slide_deal_overview(c):
    """Page 15: Deal Overview & Structure."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 75, "Google\u2013Wiz Acquisition Overview & Deal Structure")
    draw_accent_line(c, MARGIN, H - 87, 80, ACCENT, 3)

    half_w = (W - 2*MARGIN - 30) / 2

    # Left: Deal Overview
    lx = MARGIN
    ly = H - 120
    draw_rounded_rect(c, lx, ly - 370, half_w, 370, fill_color=LIGHT_BG, stroke_color=BORDER)

    c.setFont("Helvetica-Bold", 15)
    c.setFillColor(ACCENT)
    c.drawString(lx + 18, ly - 22, "Deal Overview")
    # Google logo
    draw_img(c, asset("google_logo.png"), lx + half_w - 110, ly - 30, width=80, height=25)

    details = [
        ("Target", "Wiz \u2014 cloud security platform (founded 2020)"),
        ("Acquirer", "Google Cloud (Alphabet)"),
        ("Announced", "March 18, 2025"),
        ("Deal Value", "US $32B \u2014 Google's largest acquisition ever"),
        ("Expected Close", "Pending regulatory approvals; expected 2026"),
    ]

    dy = ly - 55
    for label, value in details:
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(TEXT_DARK)
        c.drawString(lx + 18, dy, label)
        c.setFont("Helvetica", 10)
        c.setFillColor(TEXT_MID)
        c.drawString(lx + 120, dy, value)
        dy -= 22

    # Money icon
    draw_img(c, asset("money.png"), lx + half_w/2 - 30, ly - 310, width=60, height=60)

    # Right: Deal Financing & Structure
    rx = MARGIN + half_w + 30
    draw_rounded_rect(c, rx, ly - 370, half_w, 370, fill_color=HexColor("#fef3c7"), stroke_color=HexColor("#fde68a"))

    c.setFont("Helvetica-Bold", 15)
    c.setFillColor(GOLD_DARK)
    c.drawString(rx + 18, ly - 22, "Deal Financing & Structure")
    # Wiz logo
    draw_img(c, asset("wiz_logo.png"), rx + half_w - 80, ly - 30, width=55, height=22)

    draw_bullet_list(c, [
        "<b>Deal nature:</b> Friendly acquisition; negotiated and approved by both boards",
        "<b>Financing:</b> All-cash transaction (no stock, no share swap)",
        "<b>Context:</b> Google previously offered $23B in 2024, which Wiz rejected; final agreement reached at $32B in 2025",
        "<b>Integration:</b> Wiz leadership to stay on and guide integration under Google Cloud",
    ], rx + 18, ly - 50, size=10, max_width=half_w - 36, spacing=10, leading=14)

    # Merger icon
    draw_img(c, asset("merger.png"), rx + half_w/2 - 35, ly - 330, width=70, height=50)

    c.setFont("Helvetica", 8)
    c.setFillColor(TEXT_LIGHT)
    c.drawString(MARGIN, 55, "Source: Google, SEC, Nasdaq")

    draw_footer_line(c)
    draw_page_number(c, 15)


def slide_premium_analysis(c):
    """Page 16: Premium & Revenue Multiple Analysis."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Premium & Revenue Multiple Analysis")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    # Money icon
    draw_img(c, asset("money.png"), W - 140, H - 100, width=55, height=55)

    half_w = (W - 2*MARGIN - 30) / 2

    lx = MARGIN
    ly = H - 125

    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(TEXT_DARK)
    c.drawString(lx, ly, "Premium Over Prior Valuations")

    premiums = [
        ("167%", "over $12B May 2024 funding round", HexColor("#fef2f2"), RED_SOFT),
        ("100%", "over $16B late-2024 secondary market valuation", HexColor("#fef3c7"), GOLD_DARK),
        ("39%", "over Google's first $23B offer (mid-2024)", HexColor("#eff6ff"), ACCENT),
    ]

    py = ly - 30
    for pct, desc, bg, color in premiums:
        draw_rounded_rect(c, lx, py - 55, half_w, 55, fill_color=bg, stroke_color=BORDER)
        c.setFont("Helvetica-Bold", 24)
        c.setFillColor(color)
        c.drawString(lx + 15, py - 38, pct)
        c.setFont("Helvetica", 10)
        c.setFillColor(TEXT_MID)
        c.drawString(lx + 90, py - 35, desc)
        py -= 70

    # Right: Revenue multiples
    rx = MARGIN + half_w + 30
    ry = H - 125

    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(TEXT_DARK)
    c.drawString(rx, ry, "Implied Revenue Multiples at $32B")

    # Big number
    draw_rounded_rect(c, rx, ry - 80, half_w, 70, fill_color=NAVY)
    c.setFont("Helvetica-Bold", 36)
    c.setFillColor(GOLD)
    c.drawCentredString(rx + half_w/2 - 40, ry - 55, "32\u00d7")
    c.setFont("Helvetica", 13)
    c.setFillColor(white)
    c.drawString(rx + half_w/2 - 10, ry - 52, "forward revenue")
    c.setFont("Helvetica", 10)
    c.setFillColor(HexColor("#94a3b8"))
    c.drawString(rx + half_w/2 - 10, ry - 68, "Based on projected $1B ARR in 2025")

    # Comparison bars
    comparisons = [
        ("Typical cybersecurity deals", "5\u201315\u00d7", 0.25),
        ("Auth0 (prior high watermark)", "42\u00d7", 0.85),
        ("Google\u2013Wiz", "32\u00d7", 0.65),
    ]

    by = ry - 115
    for label, mult, pct in comparisons:
        c.setFont("Helvetica", 10)
        c.setFillColor(TEXT_MID)
        c.drawString(rx, by, label)
        by -= 18

        bar_w = half_w - 60
        draw_rounded_rect(c, rx, by - 2, bar_w, 16, r=8, fill_color=CARD_BG)
        is_wiz = "Wiz" in label
        fill_color = GOLD if is_wiz else ACCENT
        draw_rounded_rect(c, rx, by - 2, bar_w * pct, 16, r=8, fill_color=fill_color)
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(white if pct > 0.3 else TEXT_DARK)
        c.drawString(rx + bar_w * pct - 35 if pct > 0.3 else rx + bar_w * pct + 5, by + 1, mult)
        by -= 30

    # Note
    draw_rounded_rect(c, rx, by - 40, half_w, 38, fill_color=HexColor("#fef3c7"), stroke_color=HexColor("#fde68a"))
    c.setFont("Helvetica", 9)
    c.setFillColor(GOLD_DARK)
    c.drawString(rx + 12, by - 18, "Google\u2013Wiz is clearly priced as a future multi-billion")
    c.drawString(rx + 12, by - 30, "ARR platform, not a typical security vendor.")

    draw_footer_line(c)
    draw_page_number(c, 16)


def slide_regulatory(c):
    """Page 17: Regulatory & Legal Structure."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Regulatory & Legal Structure")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    items = [
        ("01", "Regulatory Review",
         "United States Department of Justice (DOJ) cleared antitrust review for the deal.",
         HexColor("#eff6ff"), ACCENT, asset("shield.png")),
        ("02", "Integration Commitment",
         "Google states that Wiz's products will continue to work across all major clouds "
         "(multi-cloud support) to ease regulatory concerns.",
         HexColor("#f0fdf4"), GREEN, asset("cloud.png")),
        ("03", "Closing Conditions",
         "Subject to regulatory approvals around the world. Expected to close in 2026.",
         HexColor("#fef3c7"), GOLD_DARK, asset("money.png")),
    ]

    card_w = (W - 2*MARGIN - 40) / 3
    card_h = 280

    for i, (num, title, desc, bg, accent, icon) in enumerate(items):
        x = MARGIN + i * (card_w + 20)
        y = H - 130

        draw_rounded_rect(c, x, y - card_h, card_w, card_h, fill_color=bg, stroke_color=BORDER)

        # Icon at top
        draw_img(c, icon, x + card_w/2 - 22, y - 30, width=44, height=50)

        # Number
        c.setFillColor(accent)
        c.circle(x + card_w/2, y - 95, 20, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 16)
        c.setFillColor(white)
        c.drawCentredString(x + card_w/2, y - 101, num)

        c.setFont("Helvetica-Bold", 14)
        c.setFillColor(TEXT_DARK)
        c.drawCentredString(x + card_w/2, y - 130, title)

        style = ParagraphStyle('reg', fontName='Helvetica', fontSize=10.5, textColor=TEXT_MID,
                               leading=15, alignment=TA_CENTER)
        p = Paragraph(desc, style)
        pw, ph = p.wrap(card_w - 30, 200)
        p.drawOn(c, x + 15, y - card_h + 25)

    c.setFont("Helvetica", 8)
    c.setFillColor(TEXT_LIGHT)
    c.drawString(MARGIN, 55, "Source: Yahoo Finance")

    draw_footer_line(c)
    draw_page_number(c, 17)


def slide_good_deal(c):
    """Page 19: Was This a Good Deal?"""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Was This a Good Deal?")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    half_w = (W - 2*MARGIN - 30) / 2

    # Financial (left)
    lx = MARGIN
    ly = H - 125
    draw_rounded_rect(c, lx, ly - 360, half_w, 360, fill_color=HexColor("#fef2f2"), stroke_color=HexColor("#fecaca"))

    # Money icon (top of card)
    draw_img(c, asset("money.png"), lx + half_w/2 - 25, ly - 55, width=50, height=50)

    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(RED_SOFT)
    c.drawCentredString(lx + half_w/2, ly - 80, "Financially \u2014 Overpriced")

    draw_bullet_list(c, [
        "Our team believes this price was <b>too expensive</b>",
        "The initial $23B offer would have been a much better deal",
        "Overall short-term investor sentiment was negative \u2014 Google's stock dipped as much as 5% at announcement",
        "This acquisition cost more than Google's previous 8 acquisitions <b>combined</b>",
    ], lx + 18, ly - 100, size=10.5, max_width=half_w - 36, spacing=10, leading=15)

    # Strategic (right)
    rx = MARGIN + half_w + 30
    draw_rounded_rect(c, rx, ly - 360, half_w, 360, fill_color=HexColor("#f0fdf4"), stroke_color=HexColor("#bbf7d0"))

    # Shield icon
    draw_img(c, asset("shield.png"), rx + half_w/2 - 22, ly - 55, width=44, height=50)

    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(GREEN)
    c.drawCentredString(rx + half_w/2, ly - 80, "Strategically \u2014 Necessary")

    draw_bullet_list(c, [
        "Critical acquisition given Wiz's existing market penetration and Fortune 500 client base",
        "Allows Google to become a key player in cloud security",
        "Provides access to high-value enterprise clients on AWS and Azure",
        "No antitrust violations as of November 2025",
    ], rx + 18, ly - 100, size=10.5, max_width=half_w - 36, spacing=10, leading=15)

    draw_footer_line(c)
    draw_page_number(c, 19)


def slide_final_decision(c):
    """Page 20: Final Decision."""
    draw_bg_solid(c, NAVY)
    c.setFillColor(GOLD)
    c.rect(0, H - 6, W, 6, fill=1, stroke=0)

    # Decorative dots
    draw_decorative_dots(c, W - 160, H - 50, 8, 4, spacing=14, color=MID_BLUE, radius=1.5)
    draw_decorative_dots(c, 60, 120, 6, 4, spacing=14, color=MID_BLUE, radius=1.5)

    # Google × Wiz logos at top
    draw_img(c, asset("google_logo.png"), W/2 - 130, H - 60, width=120, height=38)
    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2 + 10, H - 52, "\u00d7")
    draw_img(c, asset("wiz_logo.png"), W/2 + 30, H - 60, width=80, height=35)

    c.setFont("Helvetica-Bold", 30)
    c.setFillColor(white)
    c.drawCentredString(W/2, H - 95, "Final Decision")

    # Acquisition badge
    badge_w = 150
    draw_rounded_rect(c, W/2 - badge_w/2, H - 130, badge_w, 28, r=14, fill_color=GOLD)
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(NAVY)
    c.drawCentredString(W/2, H - 122, "ACQUISITION")

    # Three key points with icons
    points = [
        ("Multi-Cloud Access",
         "Google gains immediate access to AWS and Azure workloads through Wiz's native multi-cloud design.",
         asset("cloud.png")),
        ("AI Capabilities",
         "Wiz benefits from Google's AI capabilities, threat intelligence, and global distribution.",
         asset("shield.png")),
        ("Industry Leadership",
         "Together, they can lead the industry shift toward unified cloud security platforms.",
         asset("chart.png")),
    ]

    card_w = (W - 2*MARGIN - 40) / 3
    card_h = 220

    for i, (title, desc, icon) in enumerate(points):
        x = MARGIN + i * (card_w + 20)
        y = H - 170

        draw_rounded_rect(c, x, y - card_h, card_w, card_h, fill_color=DARK_BLUE, stroke_color=MID_BLUE)

        # Accent line at top
        c.setFillColor(GOLD)
        c.rect(x + 20, y - 8, card_w - 40, 3, fill=1, stroke=0)

        # Icon
        draw_img(c, icon, x + card_w/2 - 22, y - 50, width=44, height=38)

        c.setFont("Helvetica-Bold", 14)
        c.setFillColor(white)
        c.drawCentredString(x + card_w/2, y - 95, title)

        style = ParagraphStyle('fd', fontName='Helvetica', fontSize=11, textColor=HexColor("#94a3b8"),
                               leading=16, alignment=TA_CENTER)
        p = Paragraph(desc, style)
        pw, ph = p.wrap(card_w - 30, 150)
        p.drawOn(c, x + 15, y - card_h + 20)

    c.setFont("Helvetica", 8)
    c.setFillColor(HexColor("#475569"))
    c.drawRightString(W - MARGIN, 25, "20  /  22")


def slide_conclusion(c):
    """Page 21: Conclusion and Outcomes."""
    draw_bg_solid(c, white)
    draw_top_bar(c, NAVY)

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN, H - 80, "Conclusion and Outcomes")
    draw_accent_line(c, MARGIN, H - 92, 80, ACCENT, 3)

    # Merger icon
    draw_img(c, asset("merger.png"), W - 170, H - 105, width=90, height=55)

    draw_bullet_list(c, [
        "Google needed to address key gaps in its cloud security business, and Wiz was the ideal target to fill those gaps.",
        "Wiz has the opportunity to scale rapidly using Google's massive cloud infrastructure and AI capabilities.",
        "If Google's end goal is to build a market-leading security platform, this acquisition could be the stepping stone they need.",
        "In general, it is difficult to put a price tag on synergies \u2014 short-term investors primarily see the large price tag.",
        "Given the recency of the acquisition, it remains to be seen how effective this deal will be for Google's strategic position.",
    ], MARGIN, H - 130, size=12, max_width=W - 2*MARGIN - 20, spacing=18, leading=18)

    # Bottom logos
    draw_img(c, asset("google_logo.png"), W/2 - 100, 65, width=80, height=28)
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, 72, "\u00d7")
    draw_img(c, asset("wiz_logo.png"), W/2 + 20, 65, width=55, height=25)

    draw_footer_line(c)
    draw_page_number(c, 21)


def slide_thank_you(c):
    """Page 22: Thank You."""
    draw_bg_solid(c, NAVY)
    c.setFillColor(GOLD)
    c.rect(0, H - 6, W, 6, fill=1, stroke=0)

    # Decorative dots
    draw_decorative_dots(c, W - 180, H - 50, 10, 6, spacing=14, color=MID_BLUE, radius=1.5)
    draw_decorative_dots(c, 60, 130, 8, 5, spacing=14, color=MID_BLUE, radius=1.5)

    # Logos at center
    draw_img(c, asset("google_logo.png"), W/2 - 130, H/2 + 100, width=120, height=40)
    c.setFont("Helvetica-Bold", 28)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2 + 10, H/2 + 108, "\u00d7")
    draw_img(c, asset("wiz_logo.png"), W/2 + 35, H/2 + 100, width=80, height=35)

    c.setFont("Helvetica-Bold", 48)
    c.setFillColor(white)
    c.drawCentredString(W/2, H/2 + 30, "Thank You")

    draw_accent_line(c, W/2 - 50, H/2 + 12, 100, GOLD, 3)

    c.setFont("Helvetica", 14)
    c.setFillColor(HexColor("#94a3b8"))
    c.drawCentredString(W/2, H/2 - 25, "Google \u00d7 Wiz \u2014 M&A Strategic & Valuation Analysis")

    c.setFont("Helvetica", 11)
    c.setFillColor(SLATE)
    c.drawCentredString(W/2, H/2 - 60, "Ryan Benirschke  \u00b7  Stone Chung  \u00b7  Alicia Hsiao  \u00b7  Emi Kobayashi  \u00b7  Dean Wu")

    c.setFont("Helvetica", 10)
    c.setFillColor(HexColor("#475569"))
    c.drawCentredString(W/2, H/2 - 85, "Mergers & Acquisitions  |  Fall 2025  |  UC San Diego")

    # Shield icon bottom center
    draw_img(c, asset("shield.png"), W/2 - 25, 60, width=50, height=60)


# ═══════════════════════════════════════════════════════
# BUILD PDF
# ═══════════════════════════════════════════════════════

def build():
    output = os.path.abspath(OUTPUT)
    c = canvas.Canvas(output, pagesize=landscape(A4))
    c.setTitle("Google \u00d7 Wiz \u2014 M&A Strategic & Valuation Analysis")
    c.setAuthor("Ryan Benirschke, Stone Chung, Alicia Hsiao, Emi Kobayashi, Dean Wu")

    slides = [
        slide_title,                                                                    # 1
        slide_agenda,                                                                   # 2
        lambda c: slide_section_divider(c, 1, "Background", 3, asset("cloud.png")),     # 3
        slide_industry_background,                                                      # 4
        slide_strategic_positioning,                                                    # 5
        lambda c: slide_section_divider(c, 2, "Google's Acquisition", 6, asset("merger.png")),  # 6
        slide_acquisition_timeline,                                                     # 7
        slide_synergies,                                                                # 8
        lambda c: slide_section_divider(c, 3, "Strategic Outlook", 9, asset("chart.png")),  # 9
        slide_strategic_problem_1,                                                      # 10
        slide_strategic_problem_2,                                                      # 11
        slide_strategic_alternatives_overview,                                          # 12
        slide_strategic_alternatives_detail,                                            # 13
        lambda c: slide_section_divider(c, 4, "Acquisition Deal Structure", 14, asset("money.png")),  # 14
        slide_deal_overview,                                                            # 15
        slide_premium_analysis,                                                         # 16
        slide_regulatory,                                                               # 17
        lambda c: slide_section_divider(c, 5, "Conclusion", 18, asset("shield.png")),   # 18
        slide_good_deal,                                                                # 19
        slide_final_decision,                                                           # 20
        slide_conclusion,                                                               # 21
        slide_thank_you,                                                                # 22
    ]

    for slide_fn in slides:
        slide_fn(c)
        c.showPage()

    c.save()
    print(f"Generated: {output}")
    print(f"Pages: {len(slides)}")

if __name__ == "__main__":
    build()
